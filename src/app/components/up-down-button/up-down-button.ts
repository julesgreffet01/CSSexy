import { Component, input } from '@angular/core';

@Component({
  selector: 'app-up-down-button',
  imports: [],
  templateUrl: './up-down-button.html',
  styleUrl: './up-down-button.css',
})
export class UpDownButton {
  InitStat = input<boolean>(true);
  protected UpDownStat: boolean;

  constructor() {
    this.UpDownStat = this.InitStat();
  }

  SwitchState(){
    this.UpDownStat = !this.UpDownStat;
  }
}
