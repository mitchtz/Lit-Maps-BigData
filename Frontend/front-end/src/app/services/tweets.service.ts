import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TweetsService {
  track_id: string;
  constructor(private http: Http) { }

  getTweets(track_Id) {
      console.log(track_Id);
  }
}
