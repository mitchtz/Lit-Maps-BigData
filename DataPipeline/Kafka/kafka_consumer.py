#Mitch Zinser
#Kafka consumer that analyzes tweets for sentiment, then writes them to mongo. Will be threaded, each thread reads from a partition


from kafka import KafkaConsumer
from pymongo import MongoClient
import json

#Function that takes in a list of dicts and writes them to a mongodb collection. Takes in a dict of mongodb settings {"ip":"localhost" or ip, "port":27017 is default, "db":"name of db", "collection":"Name of collection"} and the list to write.
def mongo_write(mongo_settings, items):
	#Create connection to Mongo
	client = MongoClient(mongo_settings["ip"], mongo_settings["port"]) #client = MongoClient('mongodb://localhost:27017/') also works
	#Connect to a database
	db = client[mongo_settings["db"]] #Can use db = client["test-db"] to select dbs that don't use attribute style access
	#Connect to the collection you want
	collection = db[mongo_settings["collection"]] #Dictionary style access works here too: collection = db['test-collection']
	#Insert the list of documents
	post_id = collection.insert_many(items)
	#Print the _id of each doc inserted
	#print(post_id.inserted_ids)

#Naively drops the collection passed in. Takes in a dict of mongodb settings {"ip":"localhost" or ip, "port":27017 is default, "db":"name of db", "collection":"Name of collection"}.
def mongo_drop_coll(mongo_settings):
	#Create connection to Mongo
	client = MongoClient(mongo_settings["ip"], mongo_settings["port"]) #client = MongoClient('mongodb://localhost:27017/') also works
	#Connect to a database
	db = client[mongo_settings["db"]] #Can use db = client["test-db"] to select dbs that don't use attribute style access
	#Connect to the collection you want
	collection = db[mongo_settings["collection"]]
	#Delete all documents in the collection we are connected to
	result = collection.delete_many({})
	print("Deleted", result.deleted_count, "documents")


#Function that takes in a bytes object from Kafka and returns a dict
def bytes_to_dict(bytes_in):
	return dict(json.loads(bytes_in.decode("utf-8")))

#Join a consumer group for dynamic partition assignment and offset commits
consumer = KafkaConsumer("test", auto_offset_reset='earliest')#group_id='tweet_reader'
#Iterate through messages
for msg in consumer:
	#print("%s:%d:%d: key=%s value=%s") % (msg.topic, msg.partition, msg.offset, msg.key, str(bytes_to_dict(msg.value)))
	print("Value:", bytes_to_dict(msg.value))

mongo_settings = {
	"ip":"localhost",
	"port":27017,
	"db":"test_db",
	"collection":"test_coll"
	}