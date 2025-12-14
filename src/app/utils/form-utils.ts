import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';

async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 1500);
  });
}

export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      form.controls[fieldName].errors &&
      form.controls[fieldName].touched
    );
  }

  static isFieldOneEqualsFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(fieldOne)?.value;
      const field2Value = formGroup.get(fieldTwo)?.value;

      return field1Value === field2Value ? null : { passwordNotEqual: true};
    };
  }

  static getTextError(errors: ValidationErrors) {
    const patternErrors: Record<string, string> = {
      '^[a-zA-Z]+$': 'El valor solo puede contener letras',
      '^[a-zA-Z0-9]+$': 'El valor no puede contener solo espacios',
      '([a-zA-Z]+) ([a-zA-Z]+)': 'El valor debe contener nombre y apellido',
      [this.emailPattern]: 'El valor introducido no parece un correo electrónico',
      default: 'El valor no cumple el patrón requerido',
    };
    const stringErrors: Record<string, string> = {
      required: 'Este campo es obligatorio',
      minlength: `Mínimo de ${errors['minlength']?.requiredLength} caracteres`,
      min: `Valor mínimo de ${errors['min']?.min}`,
      email: 'El email introducido no es válido',
      emailTaken: 'El email ya está siendo usado por otro usuario',
      pattern: patternErrors[errors['pattern']?.requiredPattern] || patternErrors['default'],
      notStrider: 'El valor no puede ser Strider',
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

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    await sleep();

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return { emailTaken: true };
    }

    return null;
  }

  static notStrider(control: AbstractControl): ValidationErrors | null {
    const formValue = control.value;

    if (formValue === 'Strider') {
      return { notStrider: true };
    }

    return null;
  }
}
