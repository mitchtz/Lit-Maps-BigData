#import requests
from oauthlib.oauth2 import BackendApplicationClient
from requests_oauthlib import OAuth2Session

#Gets the playlist specified in the url that is passed in. Returns the response object
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
		'''
		#Need: Rank, Track ID, Name, Artist, Album, Album URL, Preview URL
		f_o.write("------------------" + "\n")
		f_o.write("Rank:" + str(rank+1) + "\n")
		f_o.write("ID:" + str(i["track"]["id"]) + "\n")
		
		f_o.write("Name:" + str(i["track"]["name"]) + "\n")
		f_o.write("Artist:" + str(i["track"]["artists"][0]["name"]) + "\n")
		
		f_o.write("Album:" + str(i["track"]["album"]["name"]) + "\n")
		
		f_o.write("Cover:" + str(i["track"]["album"]["images"]) + "\n")
		f_o.write("Preview:" + str(i["track"]["preview_url"]) + "\n")
		'''
		song_list.append(song)

	return song_list
			


if __name__ == "__main__":
	#Url of the top 50 US chart already formatted for api usage
	url = "https://api.spotify.com/v1/users/spotifycharts/playlists/37i9dQZEVXbLRQDuF5jeBp/tracks"
	res = get_playlist(url)
	#Check if the response has the expected number of results (50)
	if res.json()["total"] == 50:
		print("GET success")
		song_list = response_parse(res)
		for i in song_list:
			print("-----------------------")
			[print(j, str(i[j])) for j in i]


	else:
		print("Get failure or abnormality")
