import {ApplicationConfig, Component, Input} from '@angular/core';
import {Buttons} from '../../buttons/buttons';

@Component({
  selector: 'app-pop-up-error',
  imports: [
    Buttons
  ],
  templateUrl: './pop-up-error.html',
  styleUrl: './pop-up-error.css',
})

export class PopUpError {

  //message : input<string>();
  //type : input<"success" | "delete" | "error">();


  message  = "Erreur en docuqopsfdzuqiehfi qsdfiozeoie"
  type : "success" | "delete" | "error" = "delete";
}
