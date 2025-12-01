import {ApplicationConfig, Component, input, Input, InputSignal} from '@angular/core';
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
  callback = input< ((arg?: string) => void)>()
  message = input<string>();
  type = input<"success" | "delete" | "error">("delete");


  //message  = "Erreur en docuqopsfdzuqiehfi qsdfiozeoie"
  //type : "success" | "delete" | "error" = "delete";

  public getcallback(){
      this.callback();
  }



  public gettype(): string {
    return this.type();
  }

}
