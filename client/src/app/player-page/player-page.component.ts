import { Component, OnInit } from '@angular/core';
import {SocketService} from "../socket.service";

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css']
})
export class PlayerPageComponent implements OnInit {

  private playerName: string;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
  }

  register() {
    this.socketService.emit('new-player', this.playerName);
  }
}
