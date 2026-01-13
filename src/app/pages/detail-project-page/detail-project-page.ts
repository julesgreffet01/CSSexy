import { Component, inject, input, signal } from '@angular/core';
import { Tab } from '../../components/tabs/tab/tab';
import { Buttons } from '../../components/buttons/buttons';
import { servicesMock } from '../../../mock/services.mjs';
import { ServiceModel } from '../../models/service-model';
import { ServiceProjet } from '../../core/services/service-projet';
import { serviceServices } from '../../core/services/service-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjetModel } from '../../models/projet-model';
import { CommonModule } from '@angular/common';
import {PopUpEditable} from '../../components/popup/pop-up-editable/pop-up-editable';

@Component({
  selector: 'app-detail-project-page',
  imports: [CommonModule, Tab, Buttons, PopUpEditable],
  templateUrl: './detail-project-page.html',
  styleUrl: './detail-project-page.css',
})
export class DetailProjectPage {

  serviceProject = inject(ServiceProjet);
  serviceService = inject(serviceServices);
  route = inject(ActivatedRoute);
  currentProject = signal<ProjetModel | undefined>(undefined);
  currentServiceList = signal<ServiceModel[]>([]);
  loading = signal<boolean>(true);
  errorProject = signal<boolean>(false);

  modalCreate = signal<boolean>(false);
  modalUpdate = signal<boolean>(false);

  private idProject: number = 0;



  service :  ServiceModel = {
    id : '0' ,
    name : "",
    image : "",
    status : "UP",
    ports : []
  }

  projet : ProjetModel = {
    id : this.idProject,
    name : "",
    services : [],
    createdAt : new Date()
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const idToNumber = Number(id);
      this.idProject = idToNumber;
      if (idToNumber && !isNaN(idToNumber)) {
        this.serviceProject.findProjectById(idToNumber).subscribe({
          next: (project) => {
            this.currentProject.set(project);
            this.projet.name = this.currentProject()!.name;
            this.serviceService.getAllByProject(project!.id).subscribe({
              next: (service) => {
                this.currentServiceList.set(service);
                this.loading.set(false);
              },
              error: (err) => {
                this.errorProject.set(true);
                this.loading.set(false);
                console.log(err);
              },
            });
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

  onUpdateProject() {
    this.modalUpdate.set(true);
  }

  onDeleteProject() { 
    //TODO DELETE PROJECT
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
        console.log(err)
        this.errorProject.set(true);
      }
    })
  }
}
