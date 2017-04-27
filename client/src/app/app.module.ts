import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {SocketService} from "./socket.service";
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { PlayerPageComponent } from './player-page/player-page.component';
import { StageComponent } from './stage/stage.component';

const appRoutes: Routes = [
  { path: 'table', component: WelcomePageComponent },
  { path: 'player',      component: PlayerPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    PlayerPageComponent,
    StageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
