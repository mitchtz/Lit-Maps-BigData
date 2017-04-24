import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import { TrackId } from './trackId';

@Injectable()
export class SongsService {

  public trackId: TrackId;
  constructor(private http: Http) { }

  //Get all songs from the API
  getAllSongs() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/songs', { headers: headers })
      .map(res => res.json());
  }

}
