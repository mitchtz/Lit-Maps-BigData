import { Component, OnInit } from '@angular/core';
import { SongsService } from '../../services/songs.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  songs: any = [];

  clicked(variable) {
    console.log(variable);
  }

  constructor(private songsService: SongsService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.songsService.getAllSongs().subscribe(songs => {
      this.songs = songs.songs.sort(function(a, b) {
        return parseFloat(a.rank) - parseFloat(b.rank);
      });;
    });
  }

}
