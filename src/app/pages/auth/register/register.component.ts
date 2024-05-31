import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Injectable, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../shared/services/account/account.service';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { InputFormComponent } from '../../../shared/comps/form/input-form/input-form.component';
import { ValidateComponent } from '../../../shared/comps/form/validate/validate.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxMaskDirective, NgxMaskPipe, FormsModule, InputFormComponent, ValidateComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  count: number = 0;
  contatoMask = '(99) 9999-9999';

  contatoClass = 'fa-solid fa-square-phone';

  allErrorVisibleForm = false;

  codeLength: number[] = [1, 2, 3, 4, 5];
  chars: string[] = ['', '', '', '', ''];

  token?: { token: '' };
  codeInvalid = false;

  logged = true;

  @Output()
  showModalCode = new EventEmitter<boolean>();

  private ttService = inject(ToastrService)

  private formBuilder = inject(FormBuilder)

  step1Form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6),],],
  });;

  step2Form = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(2)],],
  });;

  step3Form = this.formBuilder.group({
    contato: ['', [Validators.required]],
  });;

  constructor(
    private sign: AccountService,
    private router: Router,
    private show: showViewDarken,
  ) {
  }

  ngAfterViewInit(): void {
    document.querySelectorAll('.step-group input').forEach((input, index) => {
      let element = input as HTMLInputElement;
      if (element.checked) {
        this.count = index;
      }
    });
  }

  ngOnInit(): void {
  }

  prosseguir() {
    this.count += 1;
    (document.getElementById('stp-' + this.count) as HTMLInputElement).checked =
      true;
    this.allErrorVisibleForm = false;
  }

  prosseguirIsValidForm1() {
    if (this.step1Form.valid) {
      this.sign.isExist(this.step1Form.controls.email.value ?? '').subscribe({
        next: (data) => {
          if (data) {
            this.step1Form.controls.email.setErrors({ alreadyExists: true });
          } else {
            this.prosseguir();
          }
        }, error: () => {
          //this.step1Form.controls.email.setErrors({ alreadyExists: true });
        }
      });
      return;
    }
    this.allErrorVisibleForm = true;
  }

  prosseguirIsValidForm2() {
    if (this.step2Form.valid) {
      this.prosseguir();
      return;
    }
    this.allErrorVisibleForm = true;
  }

  prosseguirIsValidForm3() {
    if (this.step3Form.valid) {
      this.prosseguir();
      return;
    }
    this.allErrorVisibleForm = true;
  }


  create() {
    if (this.step1Form.valid && this.step2Form.valid && this.step3Form.valid) {

      let account = {
        name: this.step2Form.controls.nome.value,
        email: this.step1Form.controls.email.value ?? '',
        password: this.step1Form.controls.password.value ?? '',
        phone: this.step3Form.controls.contato.value
      }

      this.sign.create(account).subscribe({
        next: (data) => {
          this.sign.login(account.email, account.password).subscribe({
            next: (value) => {
              this.router.navigate(['d/home'])
            },
            error: (err) => { },
          })
        }, error: () => { }
      })
      return;
    }
    this.ttService.error('Infelizmente não conseguimos cadastrar-lo.', 'Erro')
  }

  enviarCode() {
    this.show.show = true;
    this.sign
      .sendCodeNumber(this.step3Form.get('contato')?.value)
      .subscribe((data) => {
        this.token = data;
      });
  }

  verificarCode() { }

  voltar() {
    this.count -= 1;
    (document.getElementById('stp-' + this.count) as HTMLInputElement).checked =
      true;
  }

  passwordVisible(element1: HTMLInputElement, icon: HTMLElement) {
    if (element1.type === 'text') {
      element1.type = 'password';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      element1.type = 'text';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  }


  getInteractionForm(formGrop: FormGroup, controlName: string) {
    let control = formGrop.get(controlName);
    return control?.touched || control?.dirty || this.allErrorVisibleForm;
  }

  isValidControlForm(formGrop: FormGroup, controlName: string) {
    if (formGrop?.get(controlName)) {
      let control = formGrop.get(controlName);
      if (control?.errors === null) {
        return false;
      }
      return control?.errors && this.getInteractionForm(formGrop, controlName);
    }
    return false;
  }



  constatoValidation: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let length = this.contatoMask.match(/\d/g)?.join('');
    let regex = new RegExp(`[0-9]{${length?.length}}`);

    if (regex.test(control.value)) {
      return null;
    }

    return { invalidInput: true };
  };

  getLengthMask() {
    let length = this.contatoMask.match(/\d/g)?.join('');
    //console.log(length?.length);
    return length?.length;
  }

  moveFocus(event: KeyboardEvent, index: number) {
    this.codeInvalid = false;
    let allInputs = document.querySelectorAll('.code-fields input');

    if (allInputs[index - 1] && event.key === 'Backspace') {
      (allInputs[index] as HTMLInputElement).value = '';
      (allInputs[index - 1] as HTMLInputElement).focus();
      return;
    }

    if ((allInputs[index] as HTMLInputElement).value != '') {
      const nextInput = allInputs[index + 1] as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  getFilled(index: number) {
    let input = document.querySelectorAll('.code-fields input')[index] as HTMLInputElement;
    return input.value != '';
  }

  getShowViewDarken() {
    return this.show.show;
  }
}

@Injectable({
  providedIn: 'root',
})
export class showViewDarken {
  public show: boolean = false;
}