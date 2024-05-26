import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, input } from '@angular/core';
import { InputFormComponent } from '../form/input-form/input-form.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-type-pay',
  standalone: true,
  imports: [CommonModule, InputFormComponent],
  templateUrl: './type-pay.component.html',
  styleUrl: './type-pay.component.scss'
})
export class TypePayComponent {

  trocoControl = new FormControl('')

  valorTotal = input(0)

  @Output()
  typePayEmmiter = new EventEmitter<{ type: string, troco: number }>()

  typePays: any[] = []


  togglePay(type: string) {
    const index = this.typePays.indexOf(type);
    if (index !== -1) {
      this.typePays.splice(index, 1);
    } else {
      this.typePays.push(type);
    }
  }

  emit() {
    let type = this.typePays.join(', ')
    let troco = 0

    this.typePayEmmiter.emit({ type: type, troco: troco})
  }

  isExist(type: string) {
    return this.typePays.includes(type);
  }

  getTrocoMask() {
    return this.valorTotal() > 100 ? '000,00' : '00,00'
  }
}
