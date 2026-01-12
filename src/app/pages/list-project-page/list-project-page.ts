import { Component, inject, signal } from '@angular/core';
import { SwapTab } from '../../components/swap-tab/swap-tab';
import { Tab } from '../../components/tabs/tab/tab';
import { Buttons } from '../../components/buttons/buttons';
import { ProjetModel } from '../../models/projet-model';
import { projetsMock } from '../../../mock/projets.mjs';
import { ServiceAuth } from '../../core/services/service-auth';
import { Observable } from 'rxjs';
import { UtilisateurModel } from '../../models/utilisateur-model';
import { AsyncPipe } from '@angular/common';
import { ServiceProjet } from '../../core/services/service-projet';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list-project-page',
  imports: [
    SwapTab,
    Tab,
    Buttons,
    AsyncPipe
  ],
  templateUrl: './list-project-page.html',
  styleUrl: './list-project-page.css',
})
export class ListProjectPage {

    serviceProject = inject(ServiceProjet);
    listproject = signal<ProjetModel[] | undefined>(undefined);
    route = inject(ActivatedRoute);
    loading = signal<boolean>(true);
    errorProject = signal<boolean>(false);
    user$: Observable<UtilisateurModel>

    serviceAuth = inject(ServiceAuth)

    constructor(){
      this.user$ = this.serviceAuth.getUser()
    }
    ngOnInit(): void{
      this.serviceProject.getAllProjets().subscribe({
        next: (projects) => {
        this.listproject.set(projects);  
            this.loading.set(false); 
        }, 
        error: (err) => {
            this.errorProject.set(true);
            this.loading.set(false);
            console.log(err)
        },
      });
    }
    
}
