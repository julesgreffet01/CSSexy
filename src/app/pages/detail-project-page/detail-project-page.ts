import { Component, inject, signal } from '@angular/core';
import { Tab } from '../../components/tabs/tab/tab';
import { Buttons } from '../../components/buttons/buttons';
import { ServiceModel } from '../../models/service-model';
import { ServiceProjet } from '../../core/services/service-projet';
import { serviceServices } from '../../core/services/service-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjetModel } from '../../models/projet-model';
import { AsyncPipe, CommonModule } from '@angular/common';
import {PopUpEditable} from '../../components/popup/pop-up-editable/pop-up-editable';
import { PopUpValidation } from "../../components/popup/pop-up-validation/pop-up-validation";
import { PopUpError } from '../../components/popup/pop-up-error/pop-up-error';
import {Location} from '@angular/common';
import { ServiceAuth } from '../../core/services/service-auth';
import { UtilisateurModel } from '../../models/utilisateur-model';

@Component({
  selector: 'app-detail-project-page',
  imports: [CommonModule, Tab, Buttons, PopUpEditable, PopUpValidation, PopUpError, AsyncPipe],
  templateUrl: './detail-project-page.html',
  styleUrl: './detail-project-page.css',
})
export class DetailProjectPage {


  serviceProject = inject(ServiceProjet);
  serviceService = inject(serviceServices);
  route = inject(ActivatedRoute);
  currentProject = signal<ProjetModel | undefined>(undefined);
  currentServiceList = signal<any>([]);
  loading = signal<boolean>(true);
  errorProject = signal<boolean>(false);
  router = inject(Router)

  modalCreate = signal<boolean>(false);
  modalUpdate = signal<boolean>(false);

  private idProject: number = 0;

  newProject = signal<ProjetModel | null>(null)
  validateModal = signal(false)
  modalDelete = signal(false)

  private location = inject(Location);

  authService = inject(ServiceAuth)

  user$: Observable<UtilisateurModel>

  errorForms = signal<string[] | null>(null);
  errorFormModal = signal<boolean>(false);

  constructor(){
    this.user$ = this.authService.getUser()
  }



  service :  ServiceModel = {
    Uuid : '0' ,
    Name : "",
    Image : "",
    Status : "up",
    Ports : [""]
  }

  projet : ProjetModel = {
    Id : this.idProject,
    Name : "",
    User : [],
    CreatedAt : new Date()
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const idToNumber = Number(id);
      this.idProject = idToNumber;
      if (idToNumber && !isNaN(idToNumber)) {
        this.serviceProject.findProjectById(idToNumber).subscribe({
          next: (project) => {
            this.currentProject.set(project.Data);
            this.projet.Name = this.currentProject()!.Name;
            this.serviceService.getAllByProject(project.Data.Id).subscribe({
              next: (service) => {
              const mappedServices = (service.Data).map((service: any) => ({
                  Uuid: service.Uuid,
                  Name: service.Name,
                  Image: service.Image,
                  Ports: service.Ports,
                  StartedSince: service.StartedSince,
                  Project: {
                    Id: service.Project?.Id,
                    Name: service.Project?.Name,
                    CreatedAt: service.Project?.CreatedAt
                  },
                  Status: {
                    id: service.Status?.Id,
                    libelle: service.Status?.Libelle
                  }
                }));
                this.currentServiceList.set(mappedServices);
                this.loading.set(false);
              },
              error: (err) => {
                this.errorProject.set(true);
                this.loading.set(false);
              },
            });
          },
          error: (err) => {
            this.errorProject.set(true);
            this.loading.set(false);
          },
        });
      }
    });
  }

  onUpdateProject() {
    this.modalUpdate.set(true);
  }


  goBack(){
    this.location.back();
  }


  closeModalUpdate(){
    this.modalUpdate.set(false);
  }

  showModal(){
    this.modalCreate.set(true);
  }

  closeModalCreate(){
    this.modalCreate.set(false);
  }

  createService(newService: ProjetModel | ServiceModel){
    this.serviceService.createService(this.idProject, newService as ServiceModel).subscribe({
      next: (list) => {
        this.closeModalCreate();
        this.currentServiceList.update(lists => [...lists, list]);
      },
      error: (err) => {
        this.errorProject.set(true);
      }
    })
  }

  initNewProject(newProject: ProjetModel | ServiceModel){
    this.newProject.set(newProject as ProjetModel)
    this.modalUpdate.set(false);
    this.validateModal.set(true);
  }

  updateProject(){
    this.serviceProject.updateProjet(this.newProject()!).subscribe({
      next:value => {
        this.currentProject.set(this.newProject()!)
        this.newProject.set(null)
        this.validateModal.set(false)
      },
      error: err => {

      }
    })
  }


  showModalDelete(){
    this.modalDelete.set(true)
  }

  deleteProject(){
    this.serviceProject.deleteProjet(this.currentProject()!.Id).subscribe({
      next: value => {
        this.router.navigate(['/projects'])
      }
    })
  }
  closeModalDelete(){
    this.modalDelete.set(false)
  }

  closePopupValidate(){
    this.validateModal.set(false)
  }

  formErrorsShow(errors: string[]){
    this.errorForms.set(errors)
    this.errorFormModal.set(true);
  }

  closeFormError(){
    this.errorForms.set(null)
    this.errorForms.set(null);
    this.errorFormModal.set(false);
  }
}
