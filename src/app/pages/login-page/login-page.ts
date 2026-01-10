import { Component, OnInit, OnDestroy } from '@angular/core';
import {Inputs} from '../../components/inputs/inputs';
import {Buttons} from '../../components/buttons/buttons';

@Component({
  selector: 'app-login-page',
  imports: [
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
