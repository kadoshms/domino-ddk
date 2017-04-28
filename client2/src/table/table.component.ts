import {Component, OnInit, ViewChild} from '@angular/core';
import {SocketService} from "../socket.service";
import {DominoPlayer} from "../interfaces/player";
import {StageComponent} from "./../stage/stage.component";
import {DominoGraphics} from '../graphics/domino-graphics';
import {Router} from '@angular/router';

@Component({
    selector: 'domino-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    @ViewChild(StageComponent)
        stage: StageComponent;
    players: DominoPlayer[]=[];
    constructor(private socketService: SocketService, private router: Router) { }

    ngOnInit() {
        this.socketService.registerEvent({
            name: 'innew-player',
            handler: (args) => {
                let player: DominoPlayer = args[0];
                this.players.push(player);
                console.log(player.name);
            }
        });
    }

    addGraphicsToStage (g: DominoGraphics) {
        this.stage.addGraphics(g);
    }

    update() {
        this.stage.update();
    }

    register() {
        this.socketService.emit('play', true);
    }

    getStage(): StageComponent {
        return this.stage;
    }

}
