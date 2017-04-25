import { Component, Input, Output, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { TweetsService } from '../../services/tweets.service';
import { TrackId } from '../../services/trackId';
import { SongRank } from '../../services/songRank';

declare var SPWidget: any;
var widget;
var tweetsArray = [];
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  title: string = 'My first angular2-google-maps project';
  lat: number = 39.8282;
  lng: number = -98.5795;
  tweets: any = [];
  trackId: TrackId;
  songRank: SongRank;
  constructor(private songsService: SongsService,
    private tweetsService: TweetsService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    //Grab rank and track id
    this.trackId = this.songsService.trackId;
    this.songRank = this.songsService.songRank;

    //grab tweets based on trackId
    this.tweetsService.getTweets(this.trackId).subscribe(tweets => {
      this.tweets = tweets;
      //this is where we populate map for d3.
    });;;

    // Render widget based on track id
    widget = new SPWidget({
      songId: this.trackId,
      rank: this.songRank,
      primaryColor: 'rgba(30, 215, 96, 1)',
      element: "#myWidget"
    }).start();

  }

  ngOnDestroy() {

  }


}
