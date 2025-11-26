import {Component, input} from '@angular/core';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css',
})
export class Buttons {

  protected callback = input< ((arg?: any) => void) | undefined >(undefined)
  protected label = input<string>('buttons');
  protected size = input<"large" | "medium" | "tiny">('medium');
  protected backgroundColor = input<string>('primary');
  protected textColor = input<string>('police');

  handleClick() {
    this.callback();
  }
}
