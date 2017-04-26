import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import { TrackId } from './trackId';
import { SongRank } from './songRank';
import { SongTitle } from './songTitle';

@Injectable()
export class SongsService {

  public trackId: TrackId;
  public songRank: SongRank;
  public songTitle: SongTitle;
  constructor(private http: Http) { }

  //Get all songs from the API
  getAllSongs() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://ec2-35-167-19-138.us-west-2.compute.amazonaws.com/8080/songs', { headers: headers })
      .map(res => res.json());
  }

}
