import { Component } from '@angular/core';

@Component({
  selector: 'app-user-status',
  imports: [],
  templateUrl: './user-status.html',
  styleUrl: './user-status.css',
})
export class UserStatus {
    name: string = "Un prenom";
    image = '/5907.jpg';
}
