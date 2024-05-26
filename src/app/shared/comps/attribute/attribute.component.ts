import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild, booleanAttribute, inject, input } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { InputFormComponent } from '../form/input-form/input-form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidateComponent } from '../form/validate/validate.component';

@Component({
  selector: 'app-attribute',
  standalone: true,
  imports: [CurrencyPipe, CommonModule, ModalComponent, InputFormComponent, ValidateComponent],
  templateUrl: './attribute.component.html',
  styleUrl: './attribute.component.scss'
})
export class AttributeComponent implements OnInit{
  
  ngOnInit(): void {
    this.attr.subscribe(data => {
      console.log(data)
    })
  }

  @ViewChild('modalCreate')
  modalCreate!: ModalComponent
  
  private form = inject(FormBuilder)

  attributeForm = this.form.group({
    attributeName: ['', [Validators.required]],
    attributePrice: [0, [Validators.required]],
    available: [0, [Validators.required]]
  })

  attributes = input<any[]>([])
  
  @Output()
  attr =  new EventEmitter<any[]>()

  atributesSelected: any[] = []

  @Output()
  selected = new EventEmitter<any[]>()

  viewAllError = false

  increment(attr: any) {
    let index = this.atributesSelected.findIndex(attr_ => attr_ === attr)

    if (index == -1) {
      this.atributesSelected.push(attr)
      this.selected.emit(this.atributesSelected)
    }
  }

  decrement(attr: any) {
    let index = this.atributesSelected.findIndex(attr_ => attr_ === attr)

    if (index != -1) {
      this.atributesSelected.splice(index, 1)
      this.selected.emit(this.atributesSelected)
    }
  }

  createAttribute = input(false, {
    transform: booleanAttribute
  })

  adicionar() {
    if (this.attributeForm.valid) {

      let form = this.attributeForm

      this.attributes().push(
        {
          attributeName: form.controls.attributeName.value ?? '',
          attributePrice: form.controls.attributePrice.value ?? '',
        }
      )
      this.attributeForm = this.form.group({
        attributeName: ['', [Validators.required]],
        attributePrice: [0, [Validators.required]],
        available: [0, [Validators.required]]
      })

      this.modalCreate.setActive(false)

      this.attr.emit(this.attributes())

      this.viewAllError = false
    } else {
      this.viewAllError = true
    }
  }

  isContains(attr: any) {
    return this.atributesSelected.includes(attr)
  }

  removeInAttributes(attr: any){
    let index = this.attributes().findIndex(attr_ => attr_ === attr)

    if (index != -1) {
      this.attributes().splice(index, 1)
    }
  }
}
