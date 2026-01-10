import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from '../components/header/header';
import {PopUpValidation} from '../components/popup/pop-up-validation/pop-up-validation';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Header,
    PopUpValidation,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
