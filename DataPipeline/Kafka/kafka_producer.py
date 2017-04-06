#Mitch Zinser
#Kafka producer that gets Tweets from GNIP, then pushes them to Kafka. Will be threaded, reads what needs to be updated from Mongo
#key = track_id -> ints, %#partitions, must be bytes
from kafka import KafkaProducer
import json
import threading
from queue import Queue

#Function that takes in a dict and returns a bytes object (utf-8) ready for Kafka
def dict_to_bytes(dict_in):
	return bytes(json.dumps(dict_in), "utf-8")

#Retreives all entries in the top50status table and returns the list of dicts
def get_top50_status(mongo_settings):
	#Create connection to Mongo
	client = MongoClient(mongo_settings["ip"], mongo_settings["port"]) #client = MongoClient('mongodb://localhost:27017/') also works
	#Connect to a database
	db = client[mongo_settings["db"]] #Can use db = client["test-db"] to select dbs that don't use attribute style access
	#Connect to the collection you want
	collection = db[mongo_settings["collection"]] #Dictionary style access works here too: collection = db['test-collection']
	#Get the whole list of songs
	results = collection.find()
	#Return list of dicts
	return results
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
def get_tweets(song_info, gnip_settings, kafka_settings):
	pass

#Worker to manage thread, runs logic loop until all items have been pulled from queue
def worker(work_queue, kafka_settings, gnip_settings, mongo_settings):
	while not work_queue.empty():
		song_info = work_queue.get()
		#print("Working on:", item)
		#Take in song info to retrieve, then retreive and send all responses to Kafka. Returns time of latest tweet retrieved
		latest_tweet = get_tweets(song_info, gnip_settings, kafka_settings)
		#Update mongo to reflect how many tweets have been retreived for this song
		update_mongo(song_info, mongo_settings, latest_tweet)
		#print("Done:", item)
		work_queue.task_done()
		print("Updated", song_info["track_name"].split("(")[0])



if __name__ == "__main__":
	#Number of threads to spawn
	num_threads = 5
	#Kafka setting information
	kafka_settings = {
	"topic":"test"
	"partitions":1
	}
	#Mongo setting information
	mongo_settings = {
	"ip":"localhost",
	"port":27017,
	"db":"test_db",
	"collection":"test_coll"
	}
	#GNIP setting information.PULL FROM FILE
	gnip_settings = {}

	#Create work queue that stores songs to retrieve and info about them
	work_queue = Queue()
	print("Retrieving song info and filling queue")
	#Get list of songs and info about their last updates from mongo
	songs = get_top50_status(mongo_settings)
	#Fill queue
	[work_queue.put(i) for i in songs]
	#List of children processes
	children = []
	print("--Spawning", num_threads, "children")
	#Spawn Child processes. Off to the races!
	for child in range(num_threads):
		#Spawn child with target of worker function. Pass the combination queue, output queue, and list of csv data to worker (Maybe make this shared memory instead?)
		threading.Thread(target=worker, args=[work_queue, kafka_settings, gnip_settings, mongo_settings]).start()

	#Wait for all threads to finish work
	work_queue.join()


	num_partitions = 1
	producer = KafkaProducer()#key_serializer=lambda v: bytes(v), bootstrap_servers='localhost:9092'
	for i in range(10):
		dic = {}
		dic["test"] = i
		future = producer.send("test", key=bytes(i%num_partitions), value=dict_to_bytes(dic))
		#Block until a single message is sent, or timeout
		result = future.get(timeout=60)