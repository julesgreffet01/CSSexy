import {Component, signal} from '@angular/core';
import {Buttons} from '../../components/buttons/buttons';
import {Inputs} from '../../components/inputs/inputs';

@Component({
  selector: 'app-home-page',
  imports: [Buttons, Inputs],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  protected readonly title = signal('CSSexy');
}
