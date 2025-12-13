import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [ JsonPipe, ReactiveFormsModule ],
  templateUrl: './basic-page.html',
})
export class BasicPage {
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });

  // isValidField(fieldName: string): boolean | null {
  //   return (
  //     this.myForm.controls[fieldName].errors &&
  //     this.myForm.controls[fieldName].touched
  //   );
  // }

  // getFieldError(fieldName: string): string | null {
  //   if (!this.myForm.controls[fieldName]) return null;

  //   const errors = this.myForm.controls[fieldName].errors ?? {};
  //   const stringErrors: Record<string, string> = {
  //     required: 'Este campo es obligatorio',
  //     minlength: `Mínimo de ${errors['minlength']?.requiredLength} caracteres`,
  //     min: `Valor mínimo de ${errors['min']?.min}`,
  //   };

  //   for (const key of Object.keys(errors)) {
  //     return stringErrors[key] || '';
  //   }

  //   return null;
  // }

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
    }

    this.myForm.reset({
      price: 0,
      inStorage: 0,
    });
  }
}
