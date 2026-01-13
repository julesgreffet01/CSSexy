import {Component} from '@angular/core';
import { UserStatus } from '../user-status/user-status';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [UserStatus, NgOptimizedImage],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
