import {Component, inject} from '@angular/core';
import {Location} from '@angular/common';
import {Buttons} from '../../../components/buttons/buttons';

@Component({
  selector: 'app-error-403',
  imports: [Buttons],
  templateUrl: './error-403.html',
  styleUrl: './error-403.css',
})
export class Error403 {

  private location = inject(Location);

  goBack(){
    console.log('go back');
    this.location.back();
  }

}
