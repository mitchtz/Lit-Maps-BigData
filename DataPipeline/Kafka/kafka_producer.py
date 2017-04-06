#Mitch Zinser
#Kafka producer that gets Tweets from GNIP, then pushes them to Kafka. Will be threaded, reads what needs to be updated from Mongo
#key = track_id -> ints, %#partitions, must be bytes
from kafka import KafkaProducer
import json

#Function that takes in a dict and returns a bytes object (utf-8) ready for Kafka
def dict_to_bytes(dict_in):
	return bytes(json.dumps(dict_in), "utf-8")

num_partitions = 1
producer = KafkaProducer()#key_serializer=lambda v: bytes(v), bootstrap_servers='localhost:9092'
for i in range(10):
	dic = {}
	dic["test"] = i
	future = producer.send("test", key=bytes(i%num_partitions), value=dict_to_bytes(dic))
	#Block until a single message is sent, or timeout
	result = future.get(timeout=60)