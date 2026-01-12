import {Component, inject} from '@angular/core';
import {Buttons} from "../../../components/buttons/buttons";
import {Location} from '@angular/common';

@Component({
  selector: 'app-error-404',
    imports: [
        Buttons
    ],
  templateUrl: './error-404.html',
  styleUrl: './error-404.css',
})
export class Error404 {

  private location = inject(Location);

  goBack(){
    console.log('go back');
    this.location.back();
  }

}
