import {Component, input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-login-input',
    imports: [
      ReactiveFormsModule
    ],
  templateUrl: './login-input.html',
  styleUrl: './login-input.css',
})
export class LoginInput {

  public type = input<"text" | "password">("text")
  public id = input<string>('id')
  public placeholder = input<"Login" | "Password">('Login')
  public formControlName = input<FormControl<string | null>>()

}
