import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';

export class FormUtils {
  constructor() {

  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName].errors &&
      form.controls[fieldName].touched
    );
  }

  static getTextError(errors: ValidationErrors) {
    const stringErrors: Record<string, string> = {
      required: 'Este campo es obligatorio',
      minlength: `Mínimo de ${errors['minlength']?.requiredLength} caracteres`,
      min: `Valor mínimo de ${errors['min']?.min}`,
    };

    for (const key of Object.keys(errors)) {
      return stringErrors[key] || '';
    }

    return null;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (formArray.controls[index].errors && formArray.controls[index].touched)
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getTextError(errors);
  }
}
