// import {DominoPlayer}  from "../../shared/interfaces/player"
// import {DominoEvent}  from "../../shared/interfaces/event"
// import {Domino} from "./domino"
// import Socket = SocketIO.Socket;
//
// export interface Question {
//     question:string,
//     answer:string
// }
//
//
// //Table event
// let event1:DominoEvent = { // Todo : add function nextTurn(int) in table by parm , and nextquestion()
//     name:'play',
//     handler: ()=>{
//         let socketNext:string = nextTurn(0);
//         let questnext:Question = nextquestion();
//         this.socketService.emit('nextQ',socketNext,questnext);
//     }
// }
//
//
//
// //Server event
// let event2:DominoEvent = {
//     name:'startquest',
//     handler:(socket: Socket,nextPlayer:string,nextq)=>{
//         Domino.emitToTable('questscreen');
//         Domino.emitToPlayer(nextPlayer,'choosenplayer');
//     }
//
// }
//
//
//
// //Table event
//
// let event3:DominoEvent = {
//     name:'quest-screen',
//     handler:(question:Question)=>{
//         //TODO:add question to screen
//         //TODO:save question in variable currentQuestion
//         //TODO : open timer in table.
//     }
//
// }
//
//
//
//
//
// //Player Event
//
// let event4:DominoEvent = {
//     name:'my-turn',
//     handler:(question:Question)=>{
//         //TODO: open openKeyBorad
//         //TODO: onclick CheckAnswer(playerAnswer,Question) and send to server correctAns or do nothing
//         //TODO: if CheckAnswer display and close keyBorad
//     }
//
// }
//
//
//
// //Server event
// let event5:DominoEvent = {
//     name:'correctAns',
//     handler:(question:Question)=>{
//         Domino.emitToTable('tablecorrect');
//     }
// }
//
//
// //Table event
//
// let event6:DominoEvent = {
//     name:'tablecorrect',
//     handler:()=>{
//         //TODO: display answer. and init timer
//         //TODO: wait few secounds
//         let socketNext:string = nextTurn(0);
//         let questnext:Question = nextquestion();
//         this.socketService.emit('startquest',socketNext,questnext);
//     }
//
// }
//
// //Server event
// let event7:DominoEvent = {
//     name:'time-up',
//     handler:(socketId:string)=>{
//         Domino.emitToPlayer(socketId,'timesup');
//         Domino.emitToTable('openTheFloor',socketId);
//     }
//
// }
//
//
// //Player event
// let event8:DominoEvent = {
//     name:'timesup',
//     handler:(socketId:string)=>{
//         //TODO: close keyBorad and display messege
//         //TODO:display GAMEOVER
//     }
//
// }
//
// //Table event
// let event9:DominoEvent = {
//     name:'openTheFloor',
//     handler:(socketId:string)=>{
//         //TODO: display player falling
//         //TODO:delete player fromMap
//         if(playerIsWinner()){   //TODO:playerIsWinner() - check if only one left
//             //TODO:display WINNER.
//             this.socketService.emit('gameOver',socketId);
//         }else{
//             let socketNext:string = nextTurn(0);
//             let questnext:Question = nextquestion();
//             this.socketService.emit('startquest',socketNext,questnext);
//         }
//     }
//
// }
//
// //Server event
// let event10:DominoEvent = {
//     name:'gameOver',
//     handler:(socketId:string)=>{
//         Domino.emitToAllPlayer('GameOver')
//         Domino.gameOver();
//     }
//
// }
//
// //Player event
//
// let event11:DominoEvent = {
//     name:'gameOver',
//     handler:(socketId:string)=>{
//         //TODO: display somthing
//     }
//
// }
