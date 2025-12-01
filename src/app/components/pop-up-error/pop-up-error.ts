import {ApplicationConfig, Component, Input} from '@angular/core';

@Component({
  selector: 'app-pop-up-error',
  imports: [],
  templateUrl: './pop-up-error.html',
  styleUrl: './pop-up-error.css',
})

export class PopUpError {

  @Input({ required: true }) message!: string;
  @Input({ required: true })  type : "success" | "delete" | "error" = "success";
}
