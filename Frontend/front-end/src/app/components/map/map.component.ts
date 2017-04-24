import { Component, Input, Output, OnInit, ElementRef } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { TrackId } from '../../services/trackId';

declare var SPWidget: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  trackId: TrackId;
  constructor(private songsService: SongsService, private elementRef:ElementRef) { }

  ngOnInit() {
    this.trackId = this.songsService.trackId;
    // Render widget based on track id
    var widget = new SPWidget({
              songId:this.trackId,
              songRank: this,
              primaryColor: 'rgba(30, 215, 96, 1)',
              element:"#myWidget"
    }).start();

  }



}
