import { Component, OnInit } from '@angular/core';
import {SocketService} from "../socket.service";
import {DominoPlayer} from "./../interfaces/player";
import {Router} from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  players: DominoPlayer[]=[];
  constructor(private socketService: SocketService, private router: Router) { }

  ngOnInit() {
    this.socketService.registerEvent({
      name: 'new-player',
      handler: (args) => {
        let player: DominoPlayer = args[0];
        this.players.push(player);
        console.log(player.name);
      }
    });

    this.socketService.registerEvent({
      name: 'play',
      handler: (args: any[]) => {

        let players = args[0];
        console.log(players);
        this.router.navigate(['game']);
      }
    });
  }

  register() {
    this.socketService.emit('play', true);
  }

}
