import { Component, OnInit } from '@angular/core';
import {SocketService} from "../socket.service";
import {Router} from '@angular/router';

const FIGURES: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f'
];

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css']
})
export class PlayerPageComponent implements OnInit {

  private playerName: string;
  private figures = FIGURES;
  private chosen: string;
  private response :string[]=[];

  private isLoading = false;

  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit() {
    let self = this;

    this.socketService.registerEvent({
      name: 'ack',
      handler: (args) => {
        this.isLoading = true;
        console.log("ACK!")
      }

    });

    this.socketService.registerEvent({
      name: 'play',
      handler: (args) => {
        this.router.navigate(['player-view']);
      }

    });
  }

  register() {
    this.response.push(this.playerName);
    this.response.push(this.chosen);
    this.socketService.emit('new-player', this.response);
    this.playerName=null;
    this.chosen=null;
    this.response=null;
  }

  updateImg (url:string) {
    this.chosen=url;
  }

}


