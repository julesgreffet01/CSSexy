import {Component, input} from '@angular/core';
import {Header} from '../../components/header/header';

@Component({
  selector: 'app-detail-service-page',
  imports: [
    Header
  ],
  templateUrl: './detail-service-page.html',
  styleUrl: './detail-service-page.css',
})
export class DetailServicePage {

  //public Title = input<string>('');
  public Title = 'PHP';
  public ports = ["80", "801", "802", "803", "321","45644"];

}
