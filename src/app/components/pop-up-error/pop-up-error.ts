import {ApplicationConfig, Component} from '@angular/core';

@Component({
  selector: 'app-pop-up-error',
  imports: [],
  templateUrl: './pop-up-error.html',
  styleUrl: './pop-up-error.css',
})

export class PopUpError {

  message: string = "Attention, vous essayez de supprimer un projet";
  type : "success" | "delete" | "error" = "success";
}
