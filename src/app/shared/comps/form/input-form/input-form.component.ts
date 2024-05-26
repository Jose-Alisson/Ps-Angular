import { AfterViewInit, Component, ContentChildren, Input, OnInit, Output, QueryList, booleanAttribute, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ValidateComponent } from '../validate/validate.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, ValidateComponent, NgxMaskDirective, NgxMaskPipe, CommonModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.scss'
})
export class InputFormComponent implements AfterViewInit{
  
  @ContentChildren(ValidateComponent)
  validators: QueryList<ValidateComponent> | undefined;

  ngAfterViewInit(): void {
    this.validators?.forEach(validator => {
      validator.setControl(this.control())
      validator.viewAllError = this.viewAllError
    })
  }

  viewAllError = input(false)
  control = input.required<FormControl<any>>()
  required = input<boolean>(true)

  title = input('', {
    transform: (valor: string | null) => (valor || '')
  })

  type = input('text')

  prefix = input('')

  @Input()
  mask = ''

  showTyped = input(false, {
    transform: booleanAttribute
  })

  especialCharacters = input([''])
}
