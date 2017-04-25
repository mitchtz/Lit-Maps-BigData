import { Component, Input, Output, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { TrackId } from '../../services/trackId';

declare var SPWidget: any;
var widget;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  trackId: TrackId;
  constructor(private songsService: SongsService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.trackId = this.songsService.trackId;
    // Render widget based on track id
    widget = new SPWidget({
      songId: this.trackId,
      songRank: this,
      primaryColor: 'rgba(30, 215, 96, 1)',
      element: "#myWidget"
    }).start();

  }

  ngOnDestroy() {
    console.log(widget);
  }


}
