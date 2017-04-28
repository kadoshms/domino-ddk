import { Injectable } from '@angular/core';
import io from 'socket.io-client';
//import { DominoConf } from './../../shared/config/config';

export const DominoConf = {
  server: {
    address: 'http://10.10.17.160',
    port: 7676
  }
};

export interface SocketEvent {
  name: string;
  handler: (...args: any[]) => any
}

@Injectable()
export class SocketService {

  private socket: any;

  private eventHandlers: { [name: string]:  {(...args: any[]) : any}[] };

  constructor() {
    this.eventHandlers = {};
    this.socket = io(DominoConf.server.address + ":" + DominoConf.server.port);
  }

  /**
   * register a socket ev
   * @param event
   */
  public registerEvent(event: SocketEvent) {

    this.eventHandlers[event.name] = this.eventHandlers[event.name] || [];
    this.eventHandlers[event.name].push(event.handler);

    this.socket.on(event.name,
        (...args: any[]) => {
          for (let handler of this.eventHandlers[event.name]) {
            handler(args);
          }
        });
  }

  public emit(message: string, data: any) {
    this.socket.emit(message, data);
  }
}
