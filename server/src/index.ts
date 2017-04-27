/**
 * Created by noam on 27/04/17.
 */
import { Server } from './server';
import {DominoPlayer}  from "../../shared/interfaces/player"
import {DominoEvent}  from "../../shared/interfaces/event"
import Socket = SocketIO.Socket;

let server = Server.bootstrap();


server.registerSocketEvents([{
    name: 'connection',
    data: {},
    handler: (socket: Socket) => {
        if(server.isTable()){
            server.setTable(socket.id);
            server.emitToClient(socket.id, 'connection-new', true);
            console.log("Table is here " + socket.id);
        }else{
            server.emitToClient(socket.id, 'connection-new', false);
            console.log("Player is here");
            console.log(socket.id);
        }
    }
},{
    name: 'new-player',
    data: {},
    handler: (socket: Socket,namePlayer:string) => {
        console.log(socket.id);
        if(server.canAddPlayer()){
            let player:DominoPlayer ={name:namePlayer, socketId:socket.id ,pic:""};
            server.addPlayer(player);
            server.emitToClient(socket.id,'ack');
            console.log(server.getTableId());
            server.emitToClient(server.getTableId(),'new-player',player);
        }else{
            server.emitToClient(socket.id,'fail');
        }
    }
}]);

server.acceptConnections();
