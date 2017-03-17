from oauthlib.oauth2 import BackendApplicationClient
from requests_oauthlib import OAuth2Session
from pymongo import MongoClient

#Gets the playlist specified in the url that is passed in. Returns the response object.
def get_playlist(url):
	#OAuth2 information
	login_info = []
	with open('spot_cred.txt','r') as cred_file:
		for i in cred_file.readlines():
			login_info.append(i.replace("\n", ""))
	client_id = login_info[0]
	client_secret = login_info[1]

	client = BackendApplicationClient(client_id=client_id)
	oauth = OAuth2Session(client=client)
	token = oauth.fetch_token(token_url='https://accounts.spotify.com/api/token', client_id=client_id, client_secret=client_secret)
	r = oauth.get(url)
	return r

#Parses the GET playlist response, retrieves and stores information in a list of dicts, ready for insertion into mongo. Returns a list of dicts.
def response_parse(res):
	#List of dicts, where each dict represents a song
	song_list = []
	for rank,i in enumerate(res.json()["items"]):
		#Dict to store information about the song
		song = {}
		song["rank"] = rank+1
		song["track_id"] = i["track"]["id"]
		song["track_name"] = i["track"]["name"]
		song["track_artist"] = i["track"]["artists"][0]["name"]
		song["track_album"] = i["track"]["album"]["name"]
		song["album_cover"] = i["track"]["album"]["images"]
		song["preview_url"] = i["track"]["preview_url"]
		song_list.append(song)

	return song_list
			
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



if __name__ == "__main__":
	#Url of the top 50 US chart already formatted for api usage
	url = "https://api.spotify.com/v1/users/spotifycharts/playlists/37i9dQZEVXbLRQDuF5jeBp/tracks"
	#Get the playlist from Spotify using GET. Oauth is done in the function, loaded from spot_cred.txt, where line 1 is the id, line 2 is the secret
	res = get_playlist(url)
	#Check if the response has the expected number of results (50)
	if res.json()["total"] == 50:
		print("GET success")
		song_list = response_parse(res)
		mongo_settings = {
		"ip":"localhost",
		"port":27017,
		"db":"litmaps",
		"collection":"top50"
		}
		#Blindly drop the old top50 collection, anything in this if black assumes that we received 50 valid responses to our GET request. Resonable assumption to make.
		mongo_drop_coll(mongo_settings)
		#Write the new top50 list to the newly emptied collection
		mongo_write(mongo_settings, song_list)

	#If get returns a response with less than 50 results, print failure
	else:
		print("Get failure or abnormality. Response:")
		print(res.json())
