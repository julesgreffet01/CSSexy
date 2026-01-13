import {Component, inject, input, signal} from '@angular/core';
import {Header} from '../../components/header/header';
import {ServiceModel} from '../../models/service-model';
import {serviceServices} from '../../core/services/service-services';
import {Observable} from 'rxjs';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-service-page',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './detail-service-page.html',
  styleUrl: './detail-service-page.css',
})
export class DetailServicePage {


  serviceService = inject(serviceServices);
  route = inject(ActivatedRoute);
  currentService = signal<ServiceModel | undefined>(undefined);
  loading = signal<boolean>(true);
  errorProject = signal<boolean>(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.serviceService.getServices(id).subscribe({
          next: (service) => {
            this.currentService.set(service);
            this.loading.set(false);
          },
          error: (err) => {
            this.errorProject.set(true);
            this.loading.set(false);
            console.log(err);
          },
        });
      }
    });
  }

  onUpdateService() {
    console.log("coucou")
    //todo add le update
  }
  onDeleteService() {
    console.log("coucou")
    //todo add le delete
  }
}
