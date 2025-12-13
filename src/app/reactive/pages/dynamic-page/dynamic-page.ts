import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [ JsonPipe, ReactiveFormsModule ],
  templateUrl: './dynamic-page.html',
})
export class DynamicPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
        ['Resident Evil 4', Validators.required],
        ['Assassin\'s Creed II', Validators.required],
      ],
      Validators.minLength(3)
    )
  });

  newFavorite = new FormControl('', Validators.required);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }
}
