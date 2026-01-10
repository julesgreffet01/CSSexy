import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-up-down-button',
  imports: [],
  templateUrl: './up-down-button.html',
  styleUrl: './up-down-button.css',
})
export class UpDownButton {
  InitStat = input<boolean>(true);
  protected UpDownStat = signal<boolean>(true);
  toggle = output<boolean>();

  constructor() {
    this.UpDownStat.set(this.InitStat());
  }

  SwitchState() {
  this.UpDownStat.update(v => {
    const next = !v;
    this.toggle.emit(next);
    return next;
  });
}
}
