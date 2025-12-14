import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [ JsonPipe, ReactiveFormsModule ],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern(FormUtils.namePattern),
      ]
    ],
    email: [
      '',
      [Validators.required, Validators.pattern(FormUtils.emailPattern)],
      [this.formUtils.checkingServerResponse]
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(FormUtils.notOnlySpacesPattern),
        this.formUtils.notStrider,
      ]
    ],
    password: [
      '',
      [
        Validators.required, Validators.minLength(6)
      ]
    ],
    password2: [
      '',
      [Validators.required]
    ],
  }, {
    validators: [
      this.formUtils.isFieldOneEqualsFieldTwo('password', 'password2')
    ]
  });

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
