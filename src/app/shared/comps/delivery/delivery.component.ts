import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { CepComponent } from '../cep/cep.component';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, CepComponent],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss'
})
export class DeliveryComponent {

  @Output()
  addressData = new EventEmitter<any>()
}
