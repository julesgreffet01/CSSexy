import {Component, input} from '@angular/core';
import {Header} from '../../components/header/header';
import {ServiceModel} from '../../models/service-model';
import {serviceServices} from '../../core/services/service-services';
import {Observable} from 'rxjs';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-detail-service-page',
  standalone: true,
  imports: [
    Header,
    AsyncPipe,
    NgOptimizedImage
  ],
  templateUrl: './detail-service-page.html',
  styleUrl: './detail-service-page.css',
})
export class DetailServicePage {

  public service!: Observable<ServiceModel | undefined>;

  constructor(private serviceServices: serviceServices) {}

  ngOnInit() {
    console.log('DetailServicePage loaded');
    this.service = this.serviceServices.getServices("1");
  }

}
