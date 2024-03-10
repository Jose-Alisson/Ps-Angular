import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product/product.service';
import { CartService } from '../../shared/services/cart/cart.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit {

  public counter = 1

  public item: any

  private end = inject(ActivatedRoute);
  private productsS = inject(ProductService);
  private cart = inject(CartService)

  ngOnInit(): void {
    this.end.queryParamMap.subscribe((params) => {
      this.productsS.getById(params.get('c') ?? '').subscribe({
        next: (data) => {
          this.item = data
        },
        error: (err) => {},
        complete: () => {}
      })
    });
  }

  increment(){
    if(this.counter < this.item.available){
      this.counter += 1
    }
  }

  decrement(){
    if(this.counter > 1){
      this.counter -= 1
    }
  }

  addToCart(){
    let amount = {
      account:{
        id: '3820338c-c055-446f-abf8-de4a9a8acbb9'
      },
      product: this.item,
      quantity: this.counter
    }

    this.cart.create(amount).subscribe(data => {
      this.cart.addEmiter.emit(data)
    })
  }
}
