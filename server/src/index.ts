import { Server } from './server';
import {DominoPlayer}  from "../../shared/interfaces/player"
import {DominoEvent}  from "../../shared/interfaces/event"
import {Domino} from "./domino"
import Socket = SocketIO.Socket;


Domino.bootstrap();



Domino.start();