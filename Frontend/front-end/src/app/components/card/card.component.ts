import { Component, OnInit, OnDestroy } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { TrackId } from '../../services/trackId';
import { SongRank } from '../../services/songRank';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {
  songs: any = [];
  currentTrack: string;
  trackId: TrackId = {
    trackId: ""
  };
  songRank: SongRank = {
    songRank: null
  }


  constructor(private songsService: SongsService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.songsService.getAllSongs().subscribe(songs => {
      this.songs = songs.songs.sort(function(a, b) {
        return parseFloat(a.rank) - parseFloat(b.rank);
      });;
      this.trackId = this.songs.track_id;
    });
  }

  ngOnDestroy() {
    this.songsService.trackId = this.trackId;
    this.songsService.songRank = this.songRank;
  }

}
