import { Component, OnInit } from '@angular/core';
import {SocketService} from "../socket.service";
import {DominoPlayer} from "../../../../shared/interfaces/player";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.socketService.registerEvent({
      name: 'new-player',
      handler: (args) => {
        let player: DominoPlayer = args[0];
        console.log(player);
      }
    });
  }

}
