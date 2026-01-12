import {Component, inject, signal} from '@angular/core';
import { SwapTab } from '../../components/swap-tab/swap-tab';
import { Tab } from '../../components/tabs/tab/tab';
import { Buttons } from '../../components/buttons/buttons';
import { ProjetModel } from '../../models/projet-model';
import { projetsMock } from '../../../mock/projets.mjs';
import { ServiceAuth } from '../../core/services/service-auth';
import { Observable } from 'rxjs';
import { UtilisateurModel } from '../../models/utilisateur-model';
import { AsyncPipe } from '@angular/common';


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
    projectExample: ProjetModel = projetsMock[0];

    user$: Observable<UtilisateurModel>

    serviceAuth = inject(ServiceAuth)

    constructor(){
      this.user$ = this.serviceAuth.getUser()
    }




}
