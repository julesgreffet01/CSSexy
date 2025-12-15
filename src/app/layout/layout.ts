import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from '../components/header/header';
import {LoginInput} from '../components/login-input/login-input';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Header,
    LoginInput,
    ReactiveFormsModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  name = new FormControl('');

}
