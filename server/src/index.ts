import {Domino} from "./domino"
import Socket = SocketIO.Socket;


Domino.bootstrap([{
    name:'nextQ',
    handler:(socket: Socket,data:any)=>{
        console.log("nextQ " +data.question+" "+ data.socketId);
        Domino.emitToTable('quest-screen',data.question);
        Domino.emitToPlayer( data.socketId,'my-turn',data.question);
    }
},{
    name:'correct-answer',
    handler:(question:any)=>{
        Domino.emitToTable('correct-answer');
    }
},{
    name:'time-up',
    handler:(socket: Socket,socketId:string)=>{
        console.log("???"+socketId);
        Domino.emitToPlayer(socketId,'timesup');
        Domino.emitToTable('openTheFloor',socketId);
    }
}]);



Domino.start();