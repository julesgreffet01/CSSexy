import { Component, inject, signal, OnInit } from '@angular/core';
import { SwapTab } from '../../components/swap-tab/swap-tab';
import { Tab } from '../../components/tabs/tab/tab';
import { Buttons } from '../../components/buttons/buttons';
import { ProjetModel, ProjetWithCount } from '../../models/projet-model';
import { ServiceAuth } from '../../core/services/service-auth';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { UtilisateurModel } from '../../models/utilisateur-model';
import { AsyncPipe } from '@angular/common';
import { ServiceProjet } from '../../core/services/service-projet';
import { PopUpEditable } from '../../components/popup/pop-up-editable/pop-up-editable';
import type { ServiceModel } from '../../models/service-model';
import { ReactiveFormsModule } from '@angular/forms';
import { PopUpError } from '../../components/popup/pop-up-error/pop-up-error';

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
export class ListProjectPage implements OnInit {
  serviceProject = inject(ServiceProjet);
  serviceAuth = inject(ServiceAuth);

  listproject = signal<ProjetWithCount[] | undefined>(undefined);
  loading = signal<boolean>(true);
  errorProject = signal<boolean>(false);
  user$: Observable<UtilisateurModel>;

  modalCreate = signal<boolean>(false);
  errorForms = signal<string[] | null>(null);
  errorFormModal = signal<boolean>(false);

  projet: ProjetModel = {
    Id: 0,
    Name: '',
    User: [],
    CreatedAt: new Date()
  };

  constructor() {
    this.user$ = this.serviceAuth.getUser();
  }

  ngOnInit(): void {
    this.serviceProject.getAllProjets().pipe(
      switchMap((projects) => {
        const projectList: ProjetModel[] = projects.Data ?? [];

        const requests = projectList.map((project) =>
          this.serviceProject.GetCountServiceOfProject(project.Id).pipe(
          map((count): ProjetWithCount => ({
            ...project,
            serviceCount: Number(count.Data)
          })),
            catchError(() =>
              of({
                ...project,
                serviceCount: 0
              } as ProjetWithCount)
            )
          )
        );

        return forkJoin(requests);
      })
    ).subscribe({
      next: (projectsWithCount: ProjetWithCount[]) => {
        this.listproject.set(projectsWithCount);
        this.loading.set(false);
      },
      error: () => {
        this.errorProject.set(true);
        this.loading.set(false);
      }
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
