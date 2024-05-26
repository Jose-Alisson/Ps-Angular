import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, booleanAttribute, inject, input } from '@angular/core';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AddressService } from '../../services/address/address.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-cep',
  standalone: true,
  imports: [NgxMaskPipe, NgxMaskDirective, NgTemplateOutlet, ReactiveFormsModule, CommonModule, AddressComponent],
  templateUrl: './cep.component.html',
  styleUrl: './cep.component.scss'
})
export class CepComponent{
  
  @ViewChild("appAdress")
  appAdress!: AddressComponent

  @ViewChild("searchCep")
  searchCep!: TemplateRef<any>

  @ViewChild("viewCepInformation")
  viewCepInformation!: TemplateRef<any>

  cepControl = new FormControl('', [Validators.required])

  private address = inject(AddressService)

  @Output()
  selectedAddress = new EventEmitter<any>()

  result: any
  selected: any

  selectAddress = input(false)

  notViewAddressbyCep = input(false, {
    transform: booleanAttribute
  })
  
  select(address: any){
    this.selected = address
    console.log(address)
    this.address.isDelivery(address).subscribe(data => {
      this.appAdress.modalSelect.setActive(false)
      this.result = data
      this.selectedAddress.emit(address)
    })
  }

  buscar() {
    if (this.cepControl.valid) {
      let address = {
        zipCode: this.cepControl.value
      }
      this.address.isDelivery(address).subscribe(data => {
        this.result = data
        console.log(data)
      })
    }
  }

  setResult(result: any){
    this.result = result
  }
}
