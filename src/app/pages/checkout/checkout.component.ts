import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../shared/services/cart/cart.service';
import { CepComponent } from '../../shared/comps/cep/cep.component';
import { TypePayComponent } from '../../shared/comps/type-pay/type-pay.component';
import { DeliveryComponent } from '../../shared/comps/delivery/delivery.component';
import { OrderService } from '../../shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, RouterModule, CepComponent, TypePayComponent, CommonModule, DeliveryComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  private cart = inject(CartService)
  private order = inject(OrderService)
  private router = inject(Router)

  private amounts: any[] = []

  @ViewChild('delivery')
  delivery!: DeliveryComponent

  addressData: any

  typePay?: { type: string, troco: number } 

  ngOnInit(): void {
    this.cart.byLogged().subscribe(data => {
      this.amounts = data
      console.log(this.amounts)
    })
  }

  getProductSelectedAttribute(item: any) {
    return item?.map((attr: any) => attr.attributeName)?.join(', ')
  }

  getAllProductFromCart(): any {
    return this.amounts
  }

  finalizarComprar() {
    let order = {
      amounts: this.amounts,
      address: this.addressData,
      typePay: this.typePay?.type,
      troco: this.typePay?.troco
    }

    console.log(JSON.stringify(order))
    if (this.amounts.length > 0) {
      this.order.create(order).subscribe({
        next: (value) => {
          console.log(value)
          
          value.amounts?.forEach((amount: any) => {
            this.cart.removeEmmiter.emit(amount)
          });

          this.router.navigate(['d/orderList'])
        }, error: (err) => {
          console.log(err)
        }
      })
    }
  }

  getAllTotalAmountCheck(): number {
    let total = 0

    this.amounts.forEach((amount) => {
      let amountTotal = this.getTotalAmount(amount)
      total += amountTotal
    })

    if (this.addressData) {
      total += this.addressData?.information?.valueNotFormatted
    }

    return total;
  }

  delete(id: string) {
    this.cart.delete(id).subscribe(() => {
      this.amounts = this.amounts.filter((amount_) => amount_.id !== id);
    });
  }

  getTotalAmount(amount: any) {
    let total = amount?.product?.basePrice ?? 0

    amount.productAttributes?.forEach((attr: any) => {
      total += attr?.attributePrice
    });

    return total * amount.quantity
  }

  increment(amount: any) {
    if (amount.quantity < amount.product.available) {
      this.cart.increment(amount.id).subscribe((data) => {
        amount.quantity = data.result;
      });
    }
  }

  decrement(amount: any) {
    if (amount.quantity > 1) {
      this.cart.decrement(amount.id).subscribe((data) => {
        amount.quantity = data.result;
        console.log(data)
      });
    } else {
      this.delete(amount.id);
    }
  }
}
