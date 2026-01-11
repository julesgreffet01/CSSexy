import { Component } from '@angular/core';
import { UserStatus } from '../user-status/user-status';

@Component({
  selector: 'app-header',
  imports: [UserStatus],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
