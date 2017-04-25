import { Component, Input, Output, OnInit, ElementRef } from '@angular/core';
import { SongsService } from '../../services/songs.service';
import { TweetsService } from '../../services/tweets.service';
import { TrackId } from '../../services/trackId';
import { SongRank } from '../../services/songRank';
import { SongTitle } from '../../services/songTitle';

declare var SPWidget: any;
var widget;
var tweetsArray = [];
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // google map generated theme
  public styles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ];

  //animation number
  animation: number = 2;
  //zoom level
  zoom: number = 4;
  // center position
  lat: number = 39.8282;
  lng: number = -98.5795;

  //counter
  counter: number = 0;

  //Markers
  markers: marker[] = [

  ];

  tweets: any = [];
  trackId: TrackId;
  songRank: SongRank;
  songTitle: SongTitle;
  constructor(private songsService: SongsService,
    private tweetsService: TweetsService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    //Grab rank and track id
    this.trackId = this.songsService.trackId;
    this.songRank = this.songsService.songRank;
    this.songTitle = this.songsService.songTitle;

    //grab tweets based on trackId
    this.tweetsService.getTweets(this.trackId).subscribe(tweets => {
      this.tweets = tweets;
      //this is where we populate map for d3.
      if (this.tweets.length > 0) {
        for (var i = 0; i < this.tweets.length; i++) {
          this.counter++;
          console.log(this.counter);
          var coords = this.tweets.tweets[i].location;
          var coordsObject = {
            lat: coords[1],
            lng: coords[0]
          };
          this.markers.push(coordsObject);
        }
      } else {
        // we'll get creative here
        console.log('Shit\'s trash bruh');
        console.log(this.counter);
      }
    });

    // Render widget based on track id
    widget = new SPWidget({
      songId: this.trackId,
      rank: this.songRank,
      primaryColor: 'rgba(30, 215, 96, 1)',
      element: "#myWidget"
    }).start();

  }

}
// Marker Type
interface marker {
  lat: number;
  lng: number;
}
