import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from '../components/header/header';
import {Buttons} from '../components/buttons/buttons';
import {LoginInput} from '../components/login-input/login-input';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Header,
    Buttons,
    LoginInput,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
