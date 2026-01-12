import {Component, inject} from '@angular/core';
import {Location} from '@angular/common';
import {Buttons} from '../../../components/buttons/buttons';

@Component({
  selector: 'app-error-500',
  imports: [
    Buttons
  ],
  templateUrl: './error-500.html',
  styleUrl: './error-500.css',
})
export class Error500 {

  private location = inject(Location);

  goBack(){
    console.log('go back');
    this.location.back();
  }

}
