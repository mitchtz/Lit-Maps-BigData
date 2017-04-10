#Mitch Zinser
#Kafka producer that gets Tweets from GNIP, then pushes them to Kafka. Will be threaded, reads what needs to be updated from Mongo
#key = track_id -> ints, %#partitions, must be bytes
from kafka import KafkaProducer
import json
import threading
import requests
from queue import Queue
from pymongo import MongoClient

#Function that takes in a dict and returns a bytes object (utf-8) ready for Kafka
def dict_to_bytes(dict_in):
	return bytes(json.dumps(dict_in), "utf-8")

def response_to_list(res):
	tweet_list = []
	for i in res.json()["results"]:
		temp_list = {}
		temp_list["place"] = i["place"]
		temp_list["user"] = i["user"]
		temp_list["id_str"] = i["id_str"]
		temp_list["coordinates"] = i["coordinates"]
		temp_list["id"] = i["id"]
		temp_list["text"] = i["text"]
		temp_list["geo"] = i["geo"]
		temp_list["lang"] = i["lang"]
		temp_list["created_at"] = i["created_at"]
		temp_list["retweet_count"] = i["retweet_count"]
		temp_list["retweeted"] = i["retweeted"]
		#temp_list["quote_count"] = i["quote_count"]
		#temp_list["favorited"] = i["favorited"]
		temp_list["reply_count"] = i["reply_count"]

		tweet_list.append(temp_list)
		'''
		print("------------------")
		print("place:", i["place"][""])
		#print("user:", i["user"])
		#print("id_str:", i["id_str"])
		print("coordinates:", i["coordinates"])
		print("id:", i["id"])
		print("text:", i["text"])#.encode("utf-8"))
		print("geo:", i["geo"])
		print("lang:", i["lang"])
		print("created_at:", i["created_at"])
		#print("retweet_count:", i["retweet_count"])
		'''
	return tweet_list

#Retreives all entries in the top50 table and get the most recent tweet for each song returns the list of dicts
def get_top50(mongo_settings):
	#Create connection to Mongo
	client = MongoClient(mongo_settings["ip"], mongo_settings["port"]) #client = MongoClient('mongodb://localhost:27017/') also works
	#Connect to a database
	db = client[mongo_settings["db"]] #Can use db = client["test-db"] to select dbs that don't use attribute style access
	#Connect to the collection you want
	collection = db[mongo_settings["collection"]] #Dictionary style access works here too: collection = db['test-collection']
	#Get the whole list of songs
	results = collection.find()
	#Iterate through list of songs, then find the most recent tweets
	songs = []
	#db.collection.find().sort({_id: -1}).limit(1) Finds highest _id value. Mod for timestamps
	for i in results:
		#Query for the latest tweet stored about this song
		i["latest"] = db.collection.find({"track_id":i["track_id"]})#.sort({"_id": -1}).limit(1)
		songs.append(i)
		
	return songs
	''''
	for i in results:
		print(i["track_id"])
		#Split off features and long song titles (eg song (feat. artist) becomes song)
		print(i["track_name"].split("(")[0])
		print(i["track_artist"])
		print(i["rank"])
		print("------------------------")
	'''

#Function to retrieve tweets based on song info. pushes data to Kafka. Returns the timestamp of the latest tweet retrieved
def get_tweets(song_info, gnip_settings):
	search_params = {'query':'' + song_info["track_name"] + ' has:geo place_country:us lang:en', 'maxResults':'500'}
	#num_responses = 0
	resp_list = []
	#temp = []
	#Loop that searches GNIP, then continues to get results until there is no next token.
	while True:
		#try:
		#Get response
		response = requests.get(gnip_settings["url"], params=search_params, auth=(gnip_settings["user"], gnip_settings["pass"]))
		#Parse response and then add the dicts to the list of results
		resp_list.extend(response_to_list(response))
		##num_responses += 1
		#Check if we received a next token, if so, add to the search_params. Otherwise end the loop
		if "next" in response.json():
			search_params["next"] = response.json()["next"]
		else:
			#temp = response.json()["results"][0]
			break
		'''
		except:
			#print(response)
			print("Failed to GET from GNIP")
			break
		'''


		##if num_responses%5 == 0:
			##print("Responses Read:", num_responses)
		

	return resp_list

#Worker to manage thread, runs logic loop until all items have been pulled from queue
def worker(work_queue, kafka_settings, gnip_settings):
	while not work_queue.empty():
		song_info = work_queue.get()
		#print("Working on:", item)
		#Take in song info to retrieve, then retreive and send all responses to Kafka. Returns time of latest tweet retrieved
		tweets = get_tweets(song_info, gnip_settings)
		#print("Done:", item)
		work_queue.task_done()
		print("Updated", song_info["track_name"], "| Responses:", len(tweets))



if __name__ == "__main__":
	#Number of threads to spawn
	num_threads = 1
	#Kafka setting information
	kafka_settings = {
	"topic":"test",
	"partitions":1
	}
	#Mongo setting information
	mongo_settings = {
	"ip":"localhost",
	"port":27017,
	"db":"litmaps",
	"collection":"top50"
	}
	#GNIP setting information.PULL FROM FILE
	gnip_settings = {}
	login_info = []
	with open('gnip_cred.txt','r') as cred_file:
		for i in cred_file.readlines():
			login_info.append(i.replace("\n", ""))
	gnip_settings["url"] = login_info[0]
	gnip_settings["user"] = login_info[1]
	gnip_settings["pass"] = login_info[2]

	#Create work queue that stores songs to retrieve and info about them
	work_queue = Queue()
	print("Retrieving song info and filling queue")
	#Get list of songs and info about their last updates from mongo
	songs = get_top50(mongo_settings)
	top50_songs = []
	for i in songs:
		'''
		print(i)
		print(i["track_id"])
		#Split off features and long song titles (eg song (feat. artist) becomes song)
		print(i["track_name"].split("(")[0])
		print(i["track_artist"])
		print(i["rank"])
		#print(i["latest"])
		print("------------------------")
		'''
		top50_songs.append({"track_id":i["track_id"], "track_name":i["track_name"].split("(")[0]})

	
	#Fill queue
	#[work_queue.put(i) for i in top50_songs]
	work_queue.put(top50_songs[19])
	#List of children processes
	children = []
	print("--Spawning", num_threads, "children")
	#Spawn Child processes. Off to the races!
	for child in range(num_threads):
		#Spawn child with target of worker function. Pass the combination queue, output queue, and list of csv data to worker (Maybe make this shared memory instead?)
		threading.Thread(target=worker, args=[work_queue, kafka_settings, gnip_settings]).start()

	#Wait for all threads to finish work
	work_queue.join()

	'''
	num_partitions = 1
	producer = KafkaProducer()#key_serializer=lambda v: bytes(v), bootstrap_servers='localhost:9092'
	for i in range(10):
		dic = {}
		dic["test"] = i
		future = producer.send("test", key=bytes(i%num_partitions), value=dict_to_bytes(dic))
		#Block until a single message is sent, or timeout
		result = future.get(timeout=60)
	'''