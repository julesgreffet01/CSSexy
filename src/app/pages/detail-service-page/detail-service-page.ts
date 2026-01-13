import {Component, inject, input, signal} from '@angular/core';
import {Header} from '../../components/header/header';
import {ServiceModel} from '../../models/service-model';
import {serviceServices} from '../../core/services/service-services';
import {Observable} from 'rxjs';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {PopUpEditable} from '../../components/popup/pop-up-editable/pop-up-editable';

@Component({
  selector: 'app-detail-service-page',
  standalone: true,
  imports: [
    CommonModule,
    PopUpEditable
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
  modalUpdate = signal<boolean>(false);

  private idService = signal<string | null>(null)

  service :  ServiceModel = {
    id : this.idService() ?? "" ,
    name : "",
    image : "",
    status : "UP",
    ports : []
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.serviceService.getServices(id).subscribe({
          next: (service) => {
            this.currentService.set(service);
            this.idService.set(service?.id ?? null)
            this.loading.set(false);
            this.service.name = this.currentService()!.name
            this.service.image = this.currentService()!.image
            this.service.ports = this.currentService()!.ports
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
  goBack() {
    //TODO go back
  }
  onUpdateService() {
    this.modalUpdate.set(true);
  }

  closeModalUpdate() {
    this.modalUpdate.set(false);
  }

  onDeleteService() {
    console.log("coucou")
    //todo add le delete
  }
}
