import { Component, OnInit, OnDestroy } from '@angular/core';
import {Inputs} from '../../components/inputs/inputs';
import {Buttons} from '../../components/buttons/buttons';
import {LoginInput} from '../../components/login-input/login-input';

@Component({
  selector: 'app-login-page',
  imports: [
    LoginInput,
    Buttons
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage implements OnInit, OnDestroy{


  ngOnInit() {
    document.body.classList.add('bg');
  }

  ngOnDestroy() {
    document.body.classList.remove('bg');
  }


}
