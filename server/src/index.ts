import { Server } from './server';
import {DominoPlayer}  from "../../shared/interfaces/player"
import {DominoEvent}  from "../../shared/interfaces/event"
import {Domino} from "./domino"
import Socket = SocketIO.Socket;


Domino.bootstrap([{
    name: 'newEvent1',
    data: {},
    handler: (socket: Socket) => {
        Domino.emitToPlayer(socket.id,'ackk');
        Domino.emitToTable('ackk');

    }
},{
    name: 'newEvent2',
    data: {},
    handler: (socket: Socket,namePlayer:string) => {

    }
}]);



Domino.start();