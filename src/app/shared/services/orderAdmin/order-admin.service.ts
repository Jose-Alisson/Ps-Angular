import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { OrderService } from '../order/order.service';
import { io } from 'socket.io-client';



let emiter = new EventEmitter<any[]>()
let orders:any  = []

const socket = io('http://localhost:4444')


@Injectable({
  providedIn: 'root'
})
export class OrderAdminService extends OrderService{

  orderEmmiter = new EventEmitter<any[]>()

  constructor() {
    super();
    
    socket.on('allOrder', (data) => {
      this.orderEmmiter.emit(data)
    })
  }
}

