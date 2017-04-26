webpackJsonp([1,4],{

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SongsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SongsService = (function () {
    function SongsService(http) {
        this.http = http;
    }
    //Get all songs from the API
    SongsService.prototype.getAllSongs = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://ec2-35-167-19-138.us-west-2.compute.amazonaws.com/8080/songs', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    SongsService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], SongsService);
    return SongsService;
    var _a;
}());
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/songs.service.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TweetsService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TweetsService = (function () {
    function TweetsService(http) {
        this.http = http;
    }
    TweetsService.prototype.getTweets = function (track_Id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://ec2-35-167-19-138.us-west-2.compute.amazonaws.com/tweets/' + track_Id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TweetsService.prototype.getCount = function (track_Id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        return this.http.get('http://ec2-35-167-19-138.us-west-2.compute.amazonaws.com/tweets/' + track_Id + '/count', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    TweetsService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], TweetsService);
    return TweetsService;
    var _a;
}());
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/tweets.service.js.map

/***/ }),

/***/ 404:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 404;


/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(524);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/main.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Lit Maps!';
        this.titletwo = 'Check';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(698),
            styles: [__webpack_require__(691)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/app.component.js.map

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_navbar_navbar_navbar_component__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_about_about_component__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_card_card_component__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_map_map_component__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_tech_tech_component__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_jumbotron_jumbotron_component__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_songs_service__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_tweets_service__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pipes_order_by_pipe__ = __webpack_require__(531);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_9__components_card_card_component__["a" /* CardComponent */] },
    { path: 'tech', component: __WEBPACK_IMPORTED_MODULE_11__components_tech_tech_component__["a" /* TechComponent */] },
    { path: 'about', component: __WEBPACK_IMPORTED_MODULE_8__components_about_about_component__["a" /* AboutComponent */] },
    { path: 'map', component: __WEBPACK_IMPORTED_MODULE_10__components_map_map_component__["a" /* MapComponent */] }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_navbar_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_about_about_component__["a" /* AboutComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_card_card_component__["a" /* CardComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_map_map_component__["a" /* MapComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_tech_tech_component__["a" /* TechComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_jumbotron_jumbotron_component__["a" /* JumbotronComponent */],
                __WEBPACK_IMPORTED_MODULE_15__pipes_order_by_pipe__["a" /* OrderByPipe */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__["AgmCoreModule"].forRoot({
                    apiKey: 'AIzaSyBVCdV_g0UDel1hHZYuN5qjIGHD6dzZhWE'
                }),
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_13__services_songs_service__["a" /* SongsService */], __WEBPACK_IMPORTED_MODULE_14__services_tweets_service__["a" /* TweetsService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/app.module.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutComponent = (function () {
    function AboutComponent() {
    }
    AboutComponent.prototype.ngOnInit = function () {
    };
    AboutComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-about',
            template: __webpack_require__(699),
            styles: [__webpack_require__(692)]
        }), 
        __metadata('design:paramtypes', [])
    ], AboutComponent);
    return AboutComponent;
}());
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/about.component.js.map

/***/ }),

/***/ 526:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_songs_service__ = __webpack_require__(219);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CardComponent = (function () {
    function CardComponent(songsService) {
        this.songsService = songsService;
        this.songs = [];
        this.trackId = {
            trackId: ""
        };
        this.songRank = {
            songRank: null
        };
        this.songTitle = {
            songTitle: ""
        };
    }
    CardComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Retrieve posts from the API
        this.songsService.getAllSongs().subscribe(function (songs) {
            _this.songs = songs.songs.sort(function (a, b) {
                return parseFloat(a.rank) - parseFloat(b.rank);
            });
            ;
            _this.trackId = _this.songs.track_id;
        });
    };
    CardComponent.prototype.ngOnDestroy = function () {
        this.songsService.trackId = this.trackId;
        this.songsService.songRank = this.songRank;
        this.songsService.songTitle = this.songTitle;
    };
    CardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-card',
            template: __webpack_require__(700),
            styles: [__webpack_require__(693)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_songs_service__["a" /* SongsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_songs_service__["a" /* SongsService */]) === 'function' && _a) || Object])
    ], CardComponent);
    return CardComponent;
    var _a;
}());
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/card.component.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JumbotronComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var JumbotronComponent = (function () {
    function JumbotronComponent() {
    }
    JumbotronComponent.prototype.ngOnInit = function () {
    };
    JumbotronComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-jumbotron',
            template: __webpack_require__(701),
            styles: [__webpack_require__(694)]
        }), 
        __metadata('design:paramtypes', [])
    ], JumbotronComponent);
    return JumbotronComponent;
}());
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/jumbotron.component.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_songs_service__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_tweets_service__ = __webpack_require__(341);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var widget;
var tweetsArray = [];
var MapComponent = (function () {
    function MapComponent(songsService, tweetsService, elementRef) {
        this.songsService = songsService;
        this.tweetsService = tweetsService;
        this.elementRef = elementRef;
        // google map generated theme
        this.styles = [
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
        this.animation = 2;
        //zoom level
        this.zoom = 4;
        // center position
        this.lat = 39.8282;
        this.lng = -98.5795;
        //counter
        this.counter = 0;
        //Markers
        this.markers = [];
        this.tweets = [];
    }
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Grab rank and track id
        this.trackId = this.songsService.trackId;
        this.songRank = this.songsService.songRank;
        this.songTitle = this.songsService.songTitle;
        //grab tweets based on trackId
        this.tweetsService.getCount(this.trackId).subscribe(function (tweetCount) {
            _this.counter = tweetCount.count;
            console.log(_this.counter);
        });
        //grab tweets based on trackId
        this.tweetsService.getTweets(this.trackId).subscribe(function (tweets) {
            _this.tweets = tweets;
            //this is where we populate map for d3.
            if (_this.tweets.length > 0) {
                for (var i = 0; i < _this.tweets.length; i++) {
                    var coords = _this.tweets.tweets[i].location;
                    var coordsObject = {
                        lat: coords[1],
                        lng: coords[0]
                    };
                    _this.markers.push(coordsObject);
                }
            }
            else {
                console.log('Shit\'s trash bruh');
            }
        });
        // Render widget based on track id
        widget = new SPWidget({
            songId: this.trackId,
            rank: this.songRank,
            primaryColor: 'rgba(30, 215, 96, 1)',
            element: "#myWidget"
        }).start();
    };
    MapComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-map',
            template: __webpack_require__(702),
            styles: [__webpack_require__(695)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_songs_service__["a" /* SongsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_songs_service__["a" /* SongsService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_tweets_service__["a" /* TweetsService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_tweets_service__["a" /* TweetsService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _c) || Object])
    ], MapComponent);
    return MapComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/map.component.js.map

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavbarComponent = (function () {
    function NavbarComponent() {
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(703),
            styles: [__webpack_require__(696)]
        }), 
        __metadata('design:paramtypes', [])
    ], NavbarComponent);
    return NavbarComponent;
}());
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/navbar.component.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TechComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TechComponent = (function () {
    function TechComponent() {
    }
    TechComponent.prototype.ngOnInit = function () {
    };
    TechComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-tech',
            template: __webpack_require__(704),
            styles: [__webpack_require__(697)]
        }), 
        __metadata('design:paramtypes', [])
    ], TechComponent);
    return TechComponent;
}());
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/tech.component.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderByPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrderByPipe = (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (value, args) {
        var field = args[0];
        if (value == null) {
            return null;
        }
        if (field.startsWith("-")) {
            field = field.substring(1);
            if (typeof value[field] === 'string' || value[field] instanceof String) {
                return value.slice().sort(function (a, b) { return b[field].localeCompare(a[field]); });
            }
            return value.slice().sort(function (a, b) { return b[field] - a[field]; });
        }
        else {
            if (typeof value[field] === 'string' || value[field] instanceof String) {
                return value.slice().sort(function (a, b) { return -b[field].localeCompare(a[field]); });
            }
            return value.slice().sort(function (a, b) { return a[field] - b[field]; });
        }
    };
    OrderByPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'orderBy'
        }), 
        __metadata('design:paramtypes', [])
    ], OrderByPipe);
    return OrderByPipe;
}());
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/order-by.pipe.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/nolaweemengist1/Documents/Lit-maps/Frontend/front-end/src/environment.js.map

/***/ }),

/***/ 691:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 692:
/***/ (function(module, exports) {

module.exports = "p{\n    color: #fff !important\n}\n"

/***/ }),

/***/ 693:
/***/ (function(module, exports) {

module.exports = ".card {\n  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);\n  font-family: \"Roboto\", Helvetica;\n  transition: 0.3s;\n  margin: 0px;\n  padding: 0px;\n  background-color: #383838 !important;\n  color: #fff;\n}\n\n.center {\n  margin: 0 auto;\n  width: 80%;\n}\n\n.row {\n  padding-bottom: 10px;\n  padding-top: 10px;\n  width: 100%;\n  position: center;\n}\n\n.card:hover {\n  box-shadow: 0 64px 128px 0 rgba(0, 0, 0, 0);\n  background-color: #585858 !important;\n}\n\n.card img {\n  width: 100%;\n  height: 100%;\n}\n\n.card img:hover {\n  -webkit-filter: grayscale();\n  filter: grayscale();\n  cursor: pointer;\n}\n\n.container {\n  padding: 2px 16px;\n}\n\nimg {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n\nh4 {\n  white-space: nowrap;\n  overflow: hidden;\n}\n\np {\n  white-space: nowrap;\n  overflow: hidden;\n}\n"

/***/ }),

/***/ 694:
/***/ (function(module, exports) {

module.exports = "/***JUMBOTRON***/\n\n.jumbotron {\n  background-image: url('taylor_swift.jpg');\n  background-size: 100%;\n  height: 700px;\n}\n\n.jumbotron img {\n  padding-left: 10px;\n}\n\n.jumbotron .container h1 {\n  padding-top: 80px;\n  color: white;\n}\n\n.jumbotron li {\n  display: inline;\n  list-style: none;\n  margin-left: 40px;\n}\n.jumbotron a {\n  font-size: 15px;\n}\n.jumbotron a:hover {\n  color: white;\n}\n.jumbotron .btn{\n  background-color: #ff003d;\n  color: white;\n  border-radius: 0;\n  border-color: #ff003d;\n  padding: 7px 30px;\n}\n\n.jumbotron .btn:hover{\n  color: inherit;\n}\n\n.jumbotron .download {\n  margin-top: 20px;\n}\n"

/***/ }),

/***/ 695:
/***/ (function(module, exports) {

module.exports = ".sebm-google-map-container {\n  width: 1200px;\n  height: 450px;\n}\nh3{\n    font-family: \"Roboto\", Helvetica;\n    color: #fff !important;\n}\n\n.results{\n    padding-top: 40px;\n}\n"

/***/ }),

/***/ 696:
/***/ (function(module, exports) {

module.exports = ".litmapsLogo{\n    padding-left: 15px;\n}\n"

/***/ }),

/***/ 697:
/***/ (function(module, exports) {

module.exports = "img {\n  width: 100%;\n  height: 100%;\n}\n.row{\n    color: #fff!important;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex; /* equal height of the children */\n}\n"

/***/ }),

/***/ 698:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"container\">\n    <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ 699:
/***/ (function(module, exports) {

module.exports = "<p>\n  about works!\n</p>\n"

/***/ }),

/***/ 700:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div *ngFor=\"let song of songs; let i = index\">\n    <div class=\"center clearfix\" *ngIf=\"i % 4 == 0\"></div>\n    <div class=\"col-sm-3 card\">\n      <div class=\"card-header\" role=\"tab\">\n        <img src=\"{{song.album_cover[0].url}}\" (click)=\"trackId=song.track_id; songRank=song.rank; songTitle=song.track_name;\" [routerLink]=\"['/map']\">\n        <h4><b>{{song.rank}}. {{song.track_name}}</b></h4>\n        <p>{{song.track_artist}}</p>\n        <p>{{song.track_album}}</p>\n      </div>\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ 701:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n \n</div>\n"

/***/ }),

/***/ 702:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-xs-12 text-center\">\n    <h3><b>{{songRank}}. {{songTitle}}</b></h3>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-xs-12 pull-center\">\n    <!-- Using angular2-google-maps to display tweet location -->\n    <sebm-google-map [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"zoom\" [styles]=\"styles\" [disableDefaultUI]=true [zoomControl]=false (mapClick)=\"mapClicked($event)\">\n\n      <sebm-google-map-marker *ngFor=\"let m of markers; let i = index\" (markerClick)=\"clickedMarker(m, index)\" [latitude]=\"m.lat\" [iconUrl]=\"'../../../images/fire.png'\" [longitude]=\"m.lng\" [markerDraggable]=false>\n      </sebm-google-map-marker>\n    </sebm-google-map>\n    <!-- Using angular2-google-maps to display tweet location -->\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-sm-12 text-center\">\n    <h3><b>{{counter}} TWEETS</b></h3>\n  </div>\n</div>\n\n<div class=\"row\">\n  <div class=\"col-sm-3 pull-left\">\n    <div id=\"myWidget\" class=\"SPWidget\"></div>\n  </div>\n  <div class=\"col-sm-3 pull-right\">\n\n     <div class=\"results\">\n          <div *ngIf=\"counter < 1010\">\n              <img src=\"../../../images/cryingjordan.jpg\" alt=\"\">\n          </div>\n          <div *ngIf=\"counter > 1010\">\n              <iframe src=\"//giphy.com/embed/YA6dmVW0gfIw8\" width=\"360\" height=\"180\" frameBorder=\"0\" class=\"giphy-embed\" allowFullScreen></iframe>\n          </div>\n          <div *ngIf=\"counter > 5000\">\n              <iframe src=\"//giphy.com/embed/l46CfciRSJKVpUvAs\" width=\"360\" height=\"180\" frameBorder=\"0\" class=\"giphy-embed\" allowFullScreen></iframe>\n          </div>\n      </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 703:
/***/ (function(module, exports) {

module.exports = "<div id=\"navbar-green\">\n  <nav class=\"navbar navbar-ct-green\" role=\"navigation\">\n    <div class=\"container-fluid\">\n      <!-- Brand and toggle get grouped for better mobile display -->\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n        <a class=\"navbar-brand navbar-brand-logo\" href=\"#\">\n            <img class=\"litmapsLogo\" src=\"../../../images/logo.png\">\n        </a>\n      </div>\n\n      <!-- Collect the nav links, forms, and other content for toggling -->\n      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n        <ul class=\"nav navbar-nav navbar-right\">\n          <li>\n            <a [routerLink]=\"['/tech']\">\n              <i class=\"pe-7s-global\"></i>\n              <p>Tech Used</p>\n            </a>\n          </li>\n          <li>\n            <a [routerLink]=\"['/about']\">\n              <i class=\"pe-7s-user\"></i>\n              <p>About</p>\n            </a>\n          </li>\n        </ul>\n      </div>\n      <!-- /.navbar-collapse -->\n    </div>\n    <!-- /.container-fluid -->\n  </nav>\n\n</div>\n<!--  end navbar -->\n"

/***/ }),

/***/ 704:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-4\">\n    <div class=\"thumbnail\">\n      <img src=\"../../../images/angular.svg\" alt=\"\">\n      <div class=\"caption\">\n        <h3>Thumbnail label</h3>\n        <p>...</p>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-md-4\">\n    <div class=\"thumbnail\">\n      <img src=\"../../../images/Kafka.png\" alt=\"\">\n      <div class=\"caption\">\n        <h3>Thumbnail label</h3>\n        <p>...</p>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-md-4\">\n    <div class=\"thumbnail\">\n      <img src=\"../../../images/mongodb.png\" alt=\"\">\n      <div class=\"caption\">\n        <h3>Thumbnail label</h3>\n        <p>...</p>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"row\">\n  <div class=\"col-md-4\">\n    <div class=\"thumbnail\">\n      <img src=\"../../../images/GNIP.png\" alt=\"\">\n      <div class=\"caption\">\n        <h3>Thumbnail label</h3>\n        <p>...</p>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-md-4\">\n    <div class=\"thumbnail\">\n      <img src=\"../../../images/aws.png\" alt=\"\">\n      <div class=\"caption\">\n        <h3>Thumbnail label</h3>\n        <p>...</p>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-md-4\">\n    <div class=\"thumbnail\">\n      <img src=\"../../../images/node.png\" alt=\"\">\n      <div class=\"caption\">\n        <h3>Thumbnail label</h3>\n        <p>...</p>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ 722:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(405);


/***/ })

},[722]);
//# sourceMappingURL=main.bundle.map