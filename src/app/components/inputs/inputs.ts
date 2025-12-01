import {Component, input} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-inputs',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './inputs.html',
  styleUrl: './inputs.css',
})
export class Inputs {

  public type = input<"text" | "number" | "date" | "select" | "checkbox" | "email" | "submit">("text")
  public id = input<string>('id')
  public placeholder = input<string>('')
  public formControlName = input<string>('')
}
