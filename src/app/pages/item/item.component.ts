import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product/product.service';
import { CartService } from '../../shared/services/cart/cart.service';
import { AttributeComponent } from '../../shared/comps/attribute/attribute.component';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, AttributeComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent implements OnInit {

  public counter = 1

  public item: any

  public attributes: { attr: any, counter: number }[] = []

  private end = inject(ActivatedRoute);
  private productsS = inject(ProductService);
  private cart = inject(CartService)

  ngOnInit(): void {
    this.end.queryParamMap.subscribe((params) => {
      this.productsS.getById(params.get('c') ?? '').subscribe({
        next: (data) => {
          this.item = data
          data.attributes?.forEach((element: any) => {
            this.attributes.push({ attr: element, counter: 0 })
          });
        },
        error: (err) => { },
        complete: () => { }
      })
    });
  }

  increment() {
    if (this.counter < this.item.available) {
      this.counter += 1
    }
  }

  decrement() {
    if (this.counter > 1) {
      this.counter -= 1
    }
  }

  addToCart() {

    let attrs = this.attributes.filter((item) => item.counter > 0).map(item => item.attr)

    let amount = {
      // account:{
      //   id: '3820338c-c055-446f-abf8-de4a9a8acbb9'
      // },
      product: this.item,
      quantity: this.counter,
      productAttributes: attrs
    }

    this.cart.create(amount).subscribe(data => {
      this.cart.addEmiter.emit(data)
    })
  }
}
