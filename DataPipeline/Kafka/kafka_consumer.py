#Mitch Zinser
#Kafka consumer that analyzes tweets for sentiment, then writes them to mongo. Will be threaded, each thread reads from a partition

from kafka import KafkaConsumer
from kafka import TopicPartition
from pymongo import MongoClient
import json, threading

#Function that takes in a list of dicts and writes them to a mongodb collection. Takes in a dict of mongodb settings {"ip":"localhost" or ip, "port":27017 is default, "db":"name of db", "collection":"Name of collection"} and the list to write.
def mongo_write(mongo_settings, tweet):
	#Create connection to Mongo
	client = MongoClient(mongo_settings["ip"], mongo_settings["port"]) #client = MongoClient('mongodb://localhost:27017/') also works
	#Connect to a database
	db = client[mongo_settings["db"]] #Can use db = client["test-db"] to select dbs that don't use attribute style access
	#Connect to the collection you want
	collection = db[mongo_settings["collection"]] #Dictionary style access works here too: collection = db['test-collection']
	#Insert/Update the tweet
	post_id = collection.update({"_id":tweet["_id"]}, tweet, True)
	#print(post_id)
	#print("inserted", doc)


#Function that takes in a bytes object from Kafka and returns a dict
def bytes_to_dict(bytes_in):
	return dict(json.loads(bytes_in.decode("utf-8")))

#Takes in a tweet, calculates the center of the bounding box given as location
def location_strip(twt):
	#If using the original tweet format
	if "place" in twt:
		plc = twt["place"]
		if "bounding_box" in plc:
			box = plc["bounding_box"]["coordinates"][0]
			lat = [i[0] for i in box]
			lon = [i[1] for i in box]
			return [sum(lat)/len(lat), sum(lon)/len(lon)]
	#If using the activity stream format
	if "location" in twt:
		plc = twt["location"]["geo"]
		if plc["type"] == "Polygon":
			box = plc["coordinates"][0]
			lat = [i[0] for i in box]
			lon = [i[1] for i in box]
			return [sum(lat)/len(lat), sum(lon)/len(lon)]

#Takes in tweet, analyzes sentiment for the tweet and return sentiment value
def sentiment_analyze(twt):
	return 1

#Takes in created_at time from Tweet (should already be in UTC), returns formatted UTC string <yyyymmddhhmm>
def tweet_to_utc(created_at):
	utc_out = ""
	#Split tweet in time at spaces. tweet time in is formatted like this: Wed Mar 22 19:45:22 +0000 2017
	utc_in = created_at.split(" ")
	#Last term is year
	utc_out += utc_in[-1]
	#Convert month to number using dict
	months = {"Jan":"01", "Feb":"02", "Mar":"03", "Apr":"04", "May":"05", "Jun":"06", "Jul":"07", "Aug":"08", "Sep":"09", "Oct":"10", "Nov":"11", "Dec":"12"}
	utc_out += months[utc_in[1]]
	utc_out += utc_in[2]
	#Now get time, strip seconds and store hour and minute
	utc_out += (utc_in[3].split(":")[0] + utc_in[3].split(":")[1])
	return utc_out



#Worker that consumes tweets from kafka. Is passed the partition number to subscribe to.
def worker(kafka_settings, mongo_settings, partition):
	#Join a consumer group for dynamic partition assignment and offset commits
	consumer = KafkaConsumer(auto_offset_reset='earliest')#kafka_settings["topic"], auto_offset_reset='earliest')#, group_id="consumer_group1")#kafka_settings["topic"], auto_offset_reset='earliest')#group_id='tweet_reader'
	consumer.assign([TopicPartition(kafka_settings["topic"], partition)])
	print("Connected to Kafka")

	#Create connection to Mongo
	client = MongoClient(mongo_settings["ip"], mongo_settings["port"]) #client = MongoClient('mongodb://localhost:27017/') also works
	#Connect to a database
	db = client[mongo_settings["db"]] #Can use db = client["test-db"] to select dbs that don't use attribute style access
	#Connect to the collection you want
	collection = db[mongo_settings["collection"]] #Dictionary style access works here too: collection = db['test-collection']
	first = True
	#print("Connected to Mongo")
	#Iterate through messages
	for msg in consumer:
		#print("%s:%d:%d: key=%s value=%s") % (msg.topic, msg.partition, msg.offset, msg.key, str(bytes_to_dict(msg.value)))
		#print("Value:", bytes_to_dict(msg.value))
		#Convert the kafka message back into a dict
		tweet_in = bytes_to_dict(msg.value)
		
		#Check if there is a place field
		if ("place" in tweet_in) or ("location" in tweet_in):
			#Dict that will be pushed into Mongo
			tweet_out = {}
			#Start processing the tweet
			#Keep pertinent informatino that doesn't need processing
			tweet_out["track_id"] = tweet_in["track_id"]
			tweet_out["tweet_id"] = tweet_in["tweet_id"]
			tweet_out["created_at"] = tweet_in["created_at"]
			#tweet_out["created_at_int"] = int(tweet_to_utc(tweet_in["created_at"])) #tweet_in["created_at"]
			#Take in the coordinate box and average it to a single set of coordinates
			
			tweet_out["location"] = location_strip(tweet_in)
			#Analyze sentiment
			#tweet_out["sentiment"] = sentiment_analyze(tweet_in)
			

			#Insert/Update the tweet into Mongo
			post_id = collection.update({"_id":tweet_out["tweet_id"]}, tweet_out, upsert=True)
			if first:
				print(tweet_in)
				print("----------Processed----------------")
				print("Wrote:", tweet_out)
				print("Type:", type(tweet_out))
				first = False
				
		'''
		for j in tweet:
			f_o.write("--" + str(j) + ":" + str(tweet[j]) + "\n")
		f_o.write("\n--------------------------------------------------------\n")
		'''
	client.close()


if __name__ == "__main__":
	mongo_settings = {
	"ip":"localhost",
	"port":27017,
	"db":"litmaps",
	"collection":"tweets"
	}

	#Kafka setting information
	kafka_settings = {
	"topic":"tweets",
	"partitions":5
	}
	num_threads = kafka_settings["partitions"]
	children = []
	print("--Spawning", num_threads, "children")
	#Spawn Child processes. Off to the races!
	for child in range(num_threads):
		#Spawn child with target of worker function. Pass the combination queue, output queue, and list of csv data to worker (Maybe make this shared memory instead?)
		threading.Thread(target=worker, args=[kafka_settings, mongo_settings, child]).start()

	#Wait for all threads to finish work
	for i in children:
		i.join()