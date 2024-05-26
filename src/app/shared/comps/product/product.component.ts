import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { AttributeComponent } from '../attribute/attribute.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe, ModalComponent, AttributeComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  @Output()
  product = new EventEmitter<any[]>()

  @Input()
  item: any
}
