import { Component } from '@angular/core';
import {SocketService} from "./socket.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private socketService: SocketService, public parentRouter: Router) {
    this.registerEvents();
  }

  private registerEvents() {
    let self = this;
    this.socketService.registerEvent({
      name: 'connection-new',
      handler: (args: any[]) => {

        let isTable: boolean = args[0];
        let route = isTable ? 'table' : 'player';

        self.parentRouter.navigate([route]);
      }
    });
  }
}
