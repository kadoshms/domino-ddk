/**
 * Created by noam on 27/04/17.
 */
import * as express from "express";
import * as http from "http";
import * as io from 'socket.io';
import {DominoPlayer}  from "../../shared/interfaces/player"
import {DominoEvent}  from "../../shared/interfaces/event"
import {DominoConf} from  "../../shared/config/config"
import Socket = SocketIO.Socket;

export interface SocketEventMap {
    [name: string]: DominoEvent;
}

export const ServerConfig = {
    PORT: DominoConf.server.port
}

export class Server {

    public app: express.Application;
    private httpServer: any;
    private io: any;


    private port: number;
    private players: { [name: string]: DominoPlayer } = {};

    private socketEventMap: SocketEventMap = {};
    private table:string = ""; // socket id table
    private

    /**
     * create a new instance
     * @returns {Server}
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * constructor
     */
    constructor() {

        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = io(this.httpServer);

        this.config();
        this.listen();

    }

    public  isTable():boolean{
        if(this.table.length===0){
            return true;
        }
        return false;
    }

    public setTable(socketTable:string):void{
        this.table =socketTable;
    }
    public getTableId():string{
        return this.table;
    }

    /**
     * setup configurations
     */
    private config() {
        this.port = process.env.PORT || ServerConfig.PORT;
    }

    private listen() {
        this.httpServer.listen(this.port, () => {
            console.log("Server is listening on port "+this.port);
        });
    }

    /**
     * register socket evetns
     * @param events
     */
    public registerSocketEvents(events: DominoEvent[]) {
        for(let event of events) {
            this.socketEventMap[event.name] = event;
        }
    }

    private getEvent(name: string): DominoEvent {
        return this.socketEventMap[name];
    }

    /**
     * accept connection from sockets
     */
    public acceptConnections(events?: DominoEvent[]): void {
        this.io.on('connection', (socket: any) => {

            let event: DominoEvent = this.getEvent('connection');

            if (event) {
                event.handler(socket);
            }

            // register other events
            for (let ev of Object.keys(this.socketEventMap)) {
                let event = this.getEvent(ev);

                socket.on(event.name,
                    (data: any) => {
                        event.handler(socket, data);
                    }
                );
            }

        });
    }

    public addPlayer(player: DominoPlayer) {
        this.players[player.name] = player;
    }


    emitToClient(socketId: string, msg: string, data?: any) {
        if(socketId in this.io.sockets.connected){
            this.io.sockets.connected[socketId].emit(msg, data);
        }else{
            console.log(socketId + "not connected")
        }
    }

    public canAddPlayer(id:string):boolean{
        if(id in this.players){
            return false;
        }
        return true;
    }

}