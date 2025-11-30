import {Component, signal} from '@angular/core';
import {Buttons} from '../../components/buttons/buttons';

@Component({
  selector: 'app-home-page',
  imports: [Buttons],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  protected readonly title = signal('CSSexy');
}
