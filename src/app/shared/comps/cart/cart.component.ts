import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SideBarComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {

  @ViewChild('side')
  public side?: SideBarComponent;

  private cart = inject(CartService)
  public amounts: any[] = []

  ngOnInit(): void {
    this.cart.byAccountId('3820338c-c055-446f-abf8-de4a9a8acbb9').subscribe(data => {
      this.amounts = data
    })

    this.cart.addEmiter.subscribe(data => {

      let index = this.amounts.findIndex(amount => amount.id === data.id)

      if(index != -1){
        this.amounts[index] = data
      } else {
        this.amounts.push(data)
      }

      this.side?.setActive(true)
    })
  }

  increment(id: string){
    this.cart.increment(id).subscribe(data => {
      let index = this.amounts.findIndex(amount => amount.id === id)

      if(index != -1){
        this.amounts[index].quantity = data.result
      }
    })
  }

  decrement(id: string){
    this.cart.decrement(id).subscribe(data => {
      let index = this.amounts.findIndex(amount => amount.id === id)

      if(index != -1){
        this.amounts[index].quantity = data.result
      }

      if(this.amounts[index].quantity <= 0){
        this.amounts = this.amounts.filter(amount => amount.id != id)
        this.cart.delete(id).subscribe()
      }
    })
  }

  getSubTotal(){
    let value = 0

    this.amounts.forEach(amount => {
      value += amount.product.basePrice * amount.quantity
    })

    return value
  }
}
