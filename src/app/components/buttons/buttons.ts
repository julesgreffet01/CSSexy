import {Component, input, output} from '@angular/core';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css',
})
export class Buttons {


  public clicked = output()
  public label = input<string>('buttons');
  public size = input<"large" | "medium" | "tiny" | "connexion">('medium');
  public backgroundColor = input<string>('primary');
  public textColor = input<string>('police-color');
  public border = input<string>('');
  public backgroundColorHover = input<string>('');
  public type = input<'submit' | 'button'>('submit');

  handleClick() {
    this.clicked.emit()
  }

  getBackgroundColor() {
    const color = this.backgroundColor();
    return color.includes('#') ? color : `var(--${color})`;
  }

  getBackgroundColorHover() {
    const color = this.backgroundColorHover();
    return color ? (color.includes('#') ? color : `var(--${color})`) : undefined;
  }

  getTextColor() {
    const color = this.textColor();
    return color.includes('#') ? color : `var(--${color})`;
  }


  getBorder() {
    const border = this.border();
    return border ? (border.includes('#') ? border : `var(--${border})`) : undefined;
  }
}
