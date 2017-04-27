import { Server } from './server';
import {DominoPlayer}  from "../../shared/interfaces/player"
import {DominoEvent}  from "../../shared/interfaces/event"
import Socket = SocketIO.Socket;

export class Domino {
    private static server:Server ;

    public static bootstrap(){
       this.server = Server.bootstrap();
        this.server.registerSocketEvents([{
            name: 'connection',
            data: {},
            handler: (socket: Socket) => {
                if(this.server.isTable()){
                    this.server.setTable(socket.id);
                    this.server.emitToClient(socket.id, 'connection-new', true);
                    console.log("Table is here " + socket.id);
                }else{
                    this.server.emitToClient(socket.id, 'connection-new', false);
                    console.log("Player is here");
                    console.log(socket.id);
                }
            }
        },{
            name: 'new-player',
            data: {},
            handler: (socket: Socket,namePlayer:string) => {
                console.log(socket.id);
                if(this.server.canAddPlayer(socket.id)){
                    let player:DominoPlayer ={name:namePlayer, socketId:socket.id ,pic:""};
                    this.server.addPlayer(player);
                    this.server.emitToClient(socket.id,'ack');
                    console.log(this.server.getTableId());
                    this.server.emitToClient(this.server.getTableId(),'new-player',player);
                }else{
                    this.server.emitToClient(socket.id,'fail');
                }
            }
        }]);

    }

    public static start(){
        this.server.acceptConnections();
    }

    
}