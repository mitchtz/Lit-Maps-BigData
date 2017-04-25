import { Component, Input, Output, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { TweetsService } from '../../services/tweets.service';
import { TrackId } from '../../services/trackId';

declare var SPWidget: any;
var widget;
var tweetsArray = [];
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  tweets: any = [];
  trackId: TrackId;
  constructor(private songsService: SongsService,
    private tweetsService: TweetsService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.trackId = this.songsService.trackId;
    //grab tweets based on trackId
    this.tweetsService.getTweets(this.trackId).subscribe(tweets => {
      this.tweets = tweets;
      console.dir(tweets);
      //this is where we populate map for d3.
    });;;

    // Render widget based on track id
    widget = new SPWidget({
      songId: this.trackId,
      songRank: this,
      primaryColor: 'rgba(30, 215, 96, 1)',
      element: "#myWidget"
    }).start();

  }

  ngOnDestroy() {

  }


}
