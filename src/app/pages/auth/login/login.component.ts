import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../shared/services/account/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { InputFormComponent } from '../../../shared/comps/form/input-form/input-form.component';
import { ValidateComponent } from '../../../shared/comps/form/validate/validate.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, InputFormComponent, ValidateComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder)

  allErrorVisibleForm: boolean  = false;

  authForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email,]],
    password: ['', [Validators.required,]],
  });
  ;
  constructor(
    private router: Router,
    private sign: AccountService,
  ) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, this.isExistEmailViewErrorValidator]],
      password: ['', [Validators.required, this.passwordNoUnauthoredValidator]],
    });
  }

  private getAuth() {
    let group = this.authForm;

    return {
      email: group.get('email')?.value ?? '',
      password: group.get('password')?.value ?? '',
    };
  }

  login() {
    this.allErrorVisibleForm = true
    if (this.authForm.valid) {
      let auth = this.getAuth()

      this.sign.login(auth.email, auth.password).subscribe({
        next: (res) => {
          this.router.navigate(['d']);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.authForm.get('email')?.setErrors({ isExistEmailViewError: true })
          }

          if (err.status === 401) {
            this.authForm.get('password')?.setErrors({ passwordNoUnauthored: true })
          }
        },
      });
    }
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

  isExistEmailViewError = false
  passwordNoUnauthored = false

  isExistEmailViewErrorValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (this.isExistEmailViewError) {
      return { isExistEmailViewError: true }
    }
    return null;
  };

  passwordNoUnauthoredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (this.passwordNoUnauthored) {
      return { passwordNoUnauthored: true }
    }
    return null;
  };
}
