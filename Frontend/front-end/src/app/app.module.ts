import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { CardComponent } from './components/card/card.component';
import { MapComponent } from './components/map/map.component';
import { TechComponent } from './components/tech/tech.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';

import {SongsService} from './services/songs.service';
import {TweetsService} from './services/tweets.service';
import { OrderByPipe } from './pipes/order-by.pipe';

const appRoutes: Routes = [
    {path:'', component: CardComponent},
    {path:'tech', component: TechComponent},
    {path:'about', component: AboutComponent},
    {path:'map', component: MapComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    CardComponent,
    MapComponent,
    TechComponent,
    JumbotronComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SongsService, TweetsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
