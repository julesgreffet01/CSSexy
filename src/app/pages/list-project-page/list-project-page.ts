import {Component, inject, signal} from '@angular/core';
import {SwapTab} from '../../components/swap-tab/swap-tab';
import {Tab} from '../../components/tabs/tab/tab';
import {Buttons} from '../../components/buttons/buttons';
import {ProjetModel} from '../../models/projet-model';
import {ServiceAuth} from '../../core/services/service-auth';
import {Observable} from 'rxjs';
import {UtilisateurModel} from '../../models/utilisateur-model';
import {AsyncPipe} from '@angular/common';
import {ServiceProjet} from '../../core/services/service-projet';
import {PopUpEditable} from '../../components/popup/pop-up-editable/pop-up-editable';
import type {ServiceModel} from '../../models/service-model';
import {ReactiveFormsModule} from '@angular/forms';
import {PopUpError} from '../../components/popup/pop-up-error/pop-up-error';


@Component({
  selector: 'app-list-project-page',
  imports: [
    SwapTab,
    Tab,
    Buttons,
    AsyncPipe,
    PopUpEditable,
    ReactiveFormsModule,
    PopUpError
  ],
  templateUrl: './list-project-page.html',
  styleUrl: './list-project-page.css',
})
export class ListProjectPage {


  serviceProject = inject(ServiceProjet);
  listproject = signal<ProjetModel[] | undefined>(undefined);
  loading = signal<boolean>(true);
  errorProject = signal<boolean>(false);
  user$: Observable<UtilisateurModel>


  serviceAuth = inject(ServiceAuth)
  modalCreate = signal<boolean>(false);
  errorForms = signal<string[] | null>(null);
  errorFormModal = signal<boolean>(false);

  projet: ProjetModel = {
    id: 0,
    name: '',
    services: [],
    createdAt: new Date()
  };

  constructor() {
    this.user$ = this.serviceAuth.getUser()
  }


  ngOnInit(): void {
    this.serviceProject.getAllProjets().subscribe({
      next: (projects) => {
        this.listproject.set(projects);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorProject.set(true);
        this.loading.set(false);
      },
    });
  }


  createProject(newProject: ProjetModel | ServiceModel) {
    this.serviceProject.createProjet(newProject as ProjetModel).subscribe({
      next: (projects) => {
        this.closeModal();
        this.listproject.set(projects);
      },
      error: (err) => {
        this.errorProject.set(true);
      }
    })
  }

  showModal() {
    this.modalCreate.set(true);
  }

  closeModal() {
    this.modalCreate.set(false);
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
