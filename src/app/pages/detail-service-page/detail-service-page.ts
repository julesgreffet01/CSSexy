import {Component, inject, input, signal} from '@angular/core';
import {Header} from '../../components/header/header';
import {ServiceModel} from '../../models/service-model';
import {serviceServices} from '../../core/services/service-services';
import {Observable} from 'rxjs';
import {AsyncPipe, CommonModule, NgOptimizedImage} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {PopUpEditable} from '../../components/popup/pop-up-editable/pop-up-editable';
import {Location} from '@angular/common'
import { PopUpValidation } from "../../components/popup/pop-up-validation/pop-up-validation";
import { ProjetModel } from '../../models/projet-model';
import { PopUpError } from '../../components/popup/pop-up-error/pop-up-error'
import { UtilisateurModel } from '../../models/utilisateur-model';
import { serviceUser } from '../../core/services/service-user';
import { ServiceAuth } from '../../core/services/service-auth';

@Component({
  selector: 'app-detail-service-page',
  standalone: true,
  imports: [
    CommonModule,
    PopUpEditable,
    PopUpValidation,
    PopUpError,
    AsyncPipe
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

  private location = inject(Location);

  validateModal = signal(false)
  modalDelete = signal(false)
  newService = signal<ServiceModel | null>(null)

  user$: Observable<UtilisateurModel>
  authService = inject(ServiceAuth)


  private router = inject(Router)

  service :  ServiceModel = {
    id : this.idService() ?? "" ,
    name : "",
    image : "",
    status : "UP",
    ports : []
  }

  constructor(){
    this.user$ = this.authService.getUser()
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
          },
        });
      }

    });
  }
  goBack(){
    this.location.back();
  }

  onUpdateService() {
    this.modalUpdate.set(true);
  }

  closeModalUpdate() {
    this.modalUpdate.set(false);
  }

  initNewService(newService: ServiceModel | ProjetModel){
    this.newService.set(newService as ServiceModel)
    this.modalUpdate.set(false);
    this.validateModal.set(true);
  }

  onDeleteService() {
    this.serviceService.deleteService(this.currentService()!.id).subscribe({
      next: value => {
        this.router.navigate(['/projects']) //todo a changer pour la prod car on aura l id du projet
      }
    })

  }

  closePopupValidate(){
    this.validateModal.set(false)
  }

  updateService(){
    this.serviceService.updateService(this.newService()!).subscribe({
      next: service => {
        this.currentService.set(this.newService()!)
        this.newService.set(null)
        this.validateModal.set(false)
      },
      error: err => {

      }
    })
  }

  closeModalDelete(){
    this.modalDelete.set(false)
  }

    showModalDelete(){
    this.modalDelete.set(true)
  }
}
