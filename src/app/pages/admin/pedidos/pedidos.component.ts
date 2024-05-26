import { Component, OnInit, inject } from '@angular/core';
import { SideBarComponent } from '../../../shared/comps/side-bar/side-bar.component';

import io from 'socket.io-client';
import { CommonModule, CurrencyPipe, JsonPipe } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';
import { MenuComponent } from '../../menu/menu.component';
import { ModalComponent } from '../../../shared/comps/modal/modal.component';
import { DeliveryComponent } from '../../../shared/comps/delivery/delivery.component';
import { TypePayComponent } from '../../../shared/comps/type-pay/type-pay.component';
import { OrderAdminService } from '../../../shared/services/orderAdmin/order-admin.service';
import { ProductService } from '../../../shared/services/product/product.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from '../../../shared/comps/product/product.component';
import { InputFormComponent } from '../../../shared/comps/form/input-form/input-form.component';
import { tap } from 'rxjs';
import { DropdownComponent } from '../../../shared/comps/dropdown/dropdown.component';


//const socket = io('http://localhost:4444')

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    SideBarComponent,
    JsonPipe,
    CurrencyPipe,
    CommonModule,
    NgxMaskPipe,
    MenuComponent,
    ModalComponent,
    DeliveryComponent,
    TypePayComponent,
    ReactiveFormsModule,
    ProductComponent,
    InputFormComponent,
    DropdownComponent
  ],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent implements OnInit {
  
  private orderAdminService = inject(OrderAdminService)
  private prouductService = inject(ProductService)
  private form = inject(FormBuilder)

  products: any = []

  orders: any[] = []
  order: any

  router = 'select'

  amounts: any[] = []

  clientOrTable = new FormControl()

  ngOnInit(): void {
    this.orderAdminService.orderEmmiter.subscribe(data => {
      this.orders = data
    })
  }
  
  increment(_t104: any) {
  }

  decrement(_t104: any) {
  }

  getOrdersByStatus(status: string) {
    return this.orders.filter(order => order.status === status).
      sort((a, b) => {
        let dateA = new Date(a?.dateCreation ?? '')
        let dateB = new Date(b?.dateCreation ?? '')

        return dateB.getTime() - dateA.getTime()
      })
  }

  getTotal(order: any) {
    let total = 0;

    order?.amounts.forEach((amount: any) => {
      let total_amount = amount?.product?.basePrice ?? 0

      amount?.selectedAttribute?.forEach((attr: any) => {
        total_amount += attr?.attributePrice ?? 0
      });

      total_amount *= amount?.quantity ?? 0
      total += total_amount
    })

    return total;
  }

  getAmountValue(amount: any) {
    let value = amount.product?.basePrice

    amount.productAttributes?.forEach((attr: any) => {
      value += attr.attributePrice
    });

    return value * amount.quantity;
  }


  getAttributeList(attrs: any) {
    return attrs?.map((attr: any) => attr.attributeName)?.join(', ')
  }

  getListStatus() {
    let status = new Set<string>()

    this.orders.forEach(order => {
      status.add(order.status)
    })
    return status
  }

  public searchControl = this.form.control('', []);

  searchText: any

  search(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.prouductService.search(this.searchControl.value ?? '').subscribe(data => {
        this.products = data
        this.searchText = this.searchControl.value
      })
    }
  }

  addToSelected(product: any) {
    this.amounts.push({ product: product, quantity: 1, })
  }
}
