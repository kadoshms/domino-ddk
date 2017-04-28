import { Component, OnInit } from '@angular/core';
import {SocketService} from "../socket.service";
import {Router} from '@angular/router';

const FIGURES: string[] = [
  'https://img.clipartfest.com/4c7b3e29c8ab0981e9b27990706755e7_3d-human-figure-wallpapers-3d-figures-presentation-clipart-free_1920-1200.jpeg ',
  'https://media.forbiddenplanet.com/products/117938.jpg',
  'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSK7Ug49Om1258xE8UsgsMpjEPvhskOWFUmNvVRqamjo1E3Roiw '
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


