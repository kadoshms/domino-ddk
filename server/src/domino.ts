import { Server } from './server';
import {DominoPlayer}  from "../../shared/interfaces/player"
import {DominoEvent}  from "../../shared/interfaces/event"
import Socket = SocketIO.Socket;

export class Domino {
    private static server:Server ;

    public static bootstrap(events: DominoEvent[]){
       this.server = Server.bootstrap();
        this.server.registerSocketEvents([{
            name: 'connection',
            data: {},
            handler: (socket: Socket) => {
                if(this.server.isTable()){
                    this.server.setTable(socket.id);
                    this.server.emitToClient(socket.id, 'connection-new', true);
                    console.log("Table is here ");
                }else{
                    this.server.emitToClient(socket.id, 'connection-new', false);
                    console.log("Player is here");
                }
            }
        },{
            name: 'new-player',
            data: {},
            handler: (socket: Socket,namePlayer:string[]) => {
                console.log(socket.id);
                if(this.server.canAddPlayer(socket.id)){
                    let player:DominoPlayer ={name:namePlayer[0], socketId:socket.id ,pic:namePlayer[1]};
                    console.log(player.name);
                    console.log(player.pic);
                    this.server.addPlayer(player);
                    this.server.emitToClient(socket.id,'ack');
                    this.server.emitToClient(this.server.getTableId(),'new-player',player);
                }else{
                    this.server.emitToClient(socket.id,'fail');
                }
            }
        },{
            name: 'play',
            data: {},
            handler: (socket: Socket) => {
                console.log("play");
                this.server.emitToClient(socket.id,'play');
            }
        }]);
        this.server.registerSocketEvents(events);

    }

    public static start(){
        this.server.acceptConnections();
    }

    public static emitToTable(msg: string, data?: any):void{
        console.log("emitToTable "+msg );
        this.server.emitToClient(this.server.getTableId(),msg,data);

    }

    public static emitToPlayer(socketId: string, msg: string, data?: any):void{
        console.log("emitToPlayer"+ msg);
        this.server.emitToClient(socketId,msg,data);
     }



}