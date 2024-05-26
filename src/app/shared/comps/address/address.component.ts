import { Component, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { AddressService } from '../../services/address/address.service';
import { InputFormComponent } from '../form/input-form/input-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { TextAreaFormComponent } from '../form/text-area-form/text-area-form.component';
import { ValidateComponent } from '../form/validate/validate.component';
import { NgxMaskPipe } from 'ngx-mask';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ModalComponent, InputFormComponent, TextAreaFormComponent, ValidateComponent, NgxMaskPipe, CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent implements OnInit {

  @ViewChild("modalCreate")
  modalCreate!: ModalComponent

  form = inject(FormBuilder)

  addressForm = this.form.group({
    zipCode: ["", [Validators.required]],
    street: ["", [Validators.required]],
    houseNumber: ["", [Validators.required]],
    complement: [""],
    lat: [""],
    log: [""]
  })

  localitation?: {lat : any, lon:any} = undefined

  viewAllError = false

  @ViewChild("modalSelect")
  modalSelect!: ModalComponent;

  private address = inject(AddressService)

  addressSelected: any

  @Output()
  addressSelectedEmmiter = new EventEmitter<any>();

  userAddresses: any[] = []

  ngOnInit(): void {
    this.address.getByLogged().subscribe(data => {
      this.userAddresses = data
    })
  }

  create() {
    if (this.addressForm.valid) {
      this.address.createBylogged(this.addressForm.value).subscribe(data => {
        this.userAddresses = data
        this.modalCreate.setActive(false)
      })

    } else {
      this.viewAllError = true
    }
  }

  locationAuto() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.localitation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }


      }, function (error) {

        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log("Permissão para geolocalização negada pelo usuário.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.log("Informações de localização indisponíveis.");
            break;
          case error.TIMEOUT:
            console.log("Tempo limite excedido ao tentar obter a localização.");
            break;
        }
      }, {
        enableHighAccuracy: true, // Solicita maior precisão, se disponível
        timeout: 10000, // Tempo limite para a solicitação em milissegundos (opcional)
        maximumAge: 0 // Força a obtenção de uma nova localização, ignorando o cache (opcional)
      });
    } else {
      alert("Seu navegador não suporta a localização automatica")
    }
  }

  selecionar(){
    if(this.addressSelected){
      this.addressSelectedEmmiter.emit(this.addressSelected)
    }
  }
}
