import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TweetsService {
  track_id: string;
  constructor(private http: Http) { }

  getTweets(track_Id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/tweets/' + track_Id, { headers: headers })
      .map(res => res.json());
  }

  getCount(track_Id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/tweets/' + track_Id +'/count', { headers: headers })
      .map(res => res.json());
  }
}
