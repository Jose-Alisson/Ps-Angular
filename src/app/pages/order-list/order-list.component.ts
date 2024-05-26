import { Component, OnInit, inject } from '@angular/core';
import { SocketClientService } from '../../shared/services/socket-client/socket-client.service';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { OrderService } from '../../shared/services/order/order.service';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, CommonModule, NgxMaskPipe],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit{
  

  private orderService = inject(OrderService)

  orders: any[] = []

  ngOnInit(): void {
    this.orderService.getByLogged().subscribe({next: (value) => {
      this.orders = value.sort((a,b) => {
        let dateA = new Date(a.dateCreation)
        let dateB = new Date(b.dateCreation)

        return dateB.getTime() - dateA.getTime();
      })
    },})
  }

  getAmountValue(amount: any){
    let value = amount.product?.basePrice
    
    amount.productAttributes?.forEach((attr: any) => {
      value += attr.attributePrice
    });

    return value * amount.quantity;
  }


  getAttributeList(attrs: any){
    return attrs?.map((attr: any) => attr.attributeName)?.join(', ')
  }

  getTotal(order: any){
    let total = 0

    order.amounts.forEach((amount: any) => {
      let amount_value = 0

      amount_value += amount.product.basePrice

      total += amount_value * amount?.quantity
    });

    return total;
  }
}
