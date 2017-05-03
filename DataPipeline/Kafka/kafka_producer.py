#Mitch Zinser
#Kafka producer that gets Tweets from GNIP, then pushes them to Kafka. Will be threaded, reads what needs to be updated from Mongo
#key = track_id -> ints, %#partitions, must be bytes
from kafka import KafkaProducer
import json, threading, requests, time
from queue import Queue
from pymongo import MongoClient

#Function that takes in a dict and returns a bytes object (utf-8) ready for Kafka
def dict_to_bytes(dict_in):
	return bytes(json.dumps(dict_in), "utf-8")

#Takes in a reseponse from GNIP and returns a list of tweets with only necessary information
def response_parer_activity(res, song_info):
	tweet_list = []
	for i in res.json()["results"]:
		try:
			temp_dict = {}
			temp_dict["body"] = i["body"]
			#temp_dict["gnip"] = i["gnip"]
			#temp_dict["actor"] = i["actor"]
			temp_dict["created_at"] = i["postedTime"]
			temp_dict["location"] = i["location"]
			temp_dict["tweet_id"] = i["id"].split(":")[2]
			#temp_dict["prefUsername"] = i["actor"]["preferredUsername"]
			temp_dict["track_id"] = song_info["track_id"]
			tweet_list.append(temp_dict)
		except:
			pass
	return tweet_list

#Takes in a response from GNIP and returns a list of tweets with basic information persisted
#This is for the old api
def response_parer_original(res, song_info):

	tweet_list = []
	for i in res.json()["results"]:
		if "place" in i:
			#[print(j, i[j]) for j in i]
			#print("----------------")
			temp_list = {}
			temp_list["place"] = i["place"]
			temp_list["user"] = i["user"]
			temp_list["id_str"] = i["id_str"]
			temp_list["coordinates"] = i["coordinates"]
			temp_list["tweet_id"] = i["id"]
			temp_list["text"] = i["text"]
			temp_list["geo"] = i["geo"]
			#temp_list["lang"] = i["lang"]
			temp_list["created_at"] = i["created_at"]
			#temp_list["retweet_count"] = i["retweet_count"]
			#temp_list["retweeted"] = i["retweeted"]
			#temp_list["quote_count"] = i["quote_count"]
			#temp_list["favorited"] = i["favorited"]
			#temp_list["reply_count"] = i["reply_count"]
			temp_list["track_id"] = song_info["track_id"]

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
	#Now loop through songs and check for their most recent tweet

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

#Function to retrieve tweets based on song info. Returns a list of responses
def get_tweets(song_info, gnip_settings):
	print("Searching:", song_info["track_name"])
	search_params = {'query':'' + song_info["track_name"] + ' has:geo place_country:us lang:en', 'maxResults':'500'}#, "fromDate":"201703240000"}# 'maxResults':'500', <yyyymmddhhmm> UTC
	#num_responses = 0
	resp_list = []
	#temp = []
	#Loop that searches GNIP, then continues to get results until there is no next token.
	while True:
		#try:
		#Get response
		response = requests.get(gnip_settings["url"], params=search_params, auth=(gnip_settings["user"], gnip_settings["pass"]))
		#Parse response and then add the dicts to the list of results
		if "results" in response.json():
			pared = response_parer_activity(response, song_info)
			#If results are in other format, try paring using other format
			if len(pared) < 1:
				pared = response_parer_original(response, song_info)

			resp_list.extend(pared)

			##resp_list.extend(response_parer_original(response, song_info))
			##num_responses += 1
		#Check if we received a next token, if so, add to the search_params. Otherwise end the loop
		#Also limit to 200000 responses, as top songs are still under 50,000, so this is a safe overestimate for now
		if ("next" in response.json()) and (len(resp_list) < 200000):
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

#Function that takes in a list of tweets and puts them into Kafka
def kafka_push(kafka_settings, tweets):
	producer = KafkaProducer()#key_serializer=lambda v: bytes(v), bootstrap_servers='localhost:9092'
	#Iterate through tweets and push to kafka
	for i in tweets:
		#Convert all chars of track_id into numbers, sum them and use this number and % with the number of partitions to determine what partiton to send to
		part_hash = sum([ord(ch) for ch in str(i["tweet_id"])])%kafka_settings["partitions"]
		#part_hash = i["id"]%kafka_settings["partitions"]
		future = producer.send(kafka_settings["topic"], key=bytes(part_hash), value=dict_to_bytes(i))
		#Block until a single message is sent, or timeout
		result = future.get(timeout=60)
		
	


#Worker to manage thread, runs logic loop until all items have been pulled from queue
def worker(work_queue, kafka_settings, gnip_settings):
	while not work_queue.empty():
		song_info = work_queue.get()
		#print("Working on:", item)
		#Get tweets from GNIP search, loop until you get results
		while True:
			tweets = get_tweets(song_info, gnip_settings)
			if len(tweets)>0:
				break
			time.sleep(5)
		#Send tweets to kafka
		kafka_push(kafka_settings, tweets)
		#print("Done:", item)
		work_queue.task_done()
		print("Updated", song_info["track_name"], "| Responses:", len(tweets))



if __name__ == "__main__":
	#Number of threads to spawn
	num_threads = 1
	#Kafka setting information
	kafka_settings = {
	"topic":"tweets",
	"partitions":5
	}
	#Mongo setting information
	mongo_settings = {
	"ip":"localhost",
	"port":27017,
	"db":"litmaps",
	"collection":"top50",
	"tweet_collection":"tweets"
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
	start = time.time()

	#Get list of songs and info about their last updates from mongo 
	songs = get_top50(mongo_settings)
	top50_songs = []
	#Split song titles down to just song name. Exclude anything after "feat." or "(". Push dict with song info onto the queue.
	for i in songs:
		#Split if there is a "(". Take everything before "("
		track = i["track_name"].split("(")[0]
		#Split if there is a "feat." in the title. lowercase the title and then split, keep title lowercase (GNIP search doesn't care about capitalization)
		track = track.lower().split("feat.")[0]
		#Remove trailing space if there is one
		if track[-1] == " ":
			track = track[:-1]

		top50_songs.append({"track_id":i["track_id"], "track_name":track})
		#Push dict onto stack
		work_queue.put({"track_id":i["track_id"], "track_name":track})

	
	#Fill queue with only some songs
	#[work_queue.put(i) for i in top50_songs[:5]]
	#List of children processes
	children = []
	print("--Spawning", num_threads, "children")
	#Spawn Child processes. Off to the races!
	for child in range(num_threads):
		#Spawn child with target of worker function. Pass the combination queue, output queue, and list of csv data to worker (Maybe make this shared memory instead?)
		threading.Thread(target=worker, args=[work_queue, kafka_settings, gnip_settings]).start()

	#Wait for all threads to finish work
	work_queue.join()
	print(time.time()-start, "seconds to run")