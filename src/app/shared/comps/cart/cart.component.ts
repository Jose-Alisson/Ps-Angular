import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';

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

  private router = inject(Router)

  ngOnInit(): void {
    this.cart.byLogged().subscribe(data => {
      this.amounts = data
      console.log(data)
    })

    this.cart.addEmiter.subscribe(data => {

      let index = this.amounts.findIndex(amount => amount.id === data.id)

      if (index != -1) {
        this.amounts[index] = data
      } else {
        this.amounts.push(data)
      }

      this.side?.setActive(true)
    })

    this.cart.removeEmmiter.subscribe(data => {
      let index = this.amounts.findIndex(amount => amount.id === data.id)

      if(index != -1){
        this.amounts.splice(index, 1);
      }
    })
  }

  increment(id: string) {
    this.cart.increment(id).subscribe(data => {
      let index = this.amounts.findIndex(amount => amount.id === id)

      if (index != -1) {
        this.amounts[index].quantity = data.result
      }
    })
  }

  decrement(id: string) {
    this.cart.decrement(id).subscribe(data => {
      let index = this.amounts.findIndex(amount => amount.id === id)

      if (index != -1) {
        this.amounts[index].quantity = data.result
      }

      if (this.amounts[index].quantity <= 0) {
        this.amounts = this.amounts.filter(amount => amount.id != id)
        this.cart.delete(id).subscribe()
      }
    })
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

  getSubTotal() {
    let value = 0

    this.amounts.forEach(amount => {
      //value += amount.product.basePrice * amount.quantity
      value += this.getAmountValue(amount)
    })

    return value
  }


  buy(){
    this.side?.setActive(false)
    this.router.navigate(['/d/checkout'])
  }
}
