import { AfterViewInit, Injectable, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

import io from 'socket.io-client';
// const socket = io('http://localhost:4444')

// socket.on('allOrder', (data) => {
//   console.log(data)
// })

@Injectable({
  providedIn: 'root',
})
export class SocketClientService{
  
  constructor() {
    // socket.on("", () => {})
  }
}
