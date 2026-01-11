import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { SwapTab } from '../../components/swap-tab/swap-tab';
import { Tab } from '../../components/tabs/tab/tab';
import { Buttons } from '../../components/buttons/buttons';
import { ProjetModel } from '../../models/projet-model';
import { projetsMock } from '../../../mock/projets.mjs';
import { ServiceModel } from '../../models/service-model';
import { servicesMock } from '../../../mock/services.mjs';

@Component({
  selector: 'app-list-project-page',
  imports: [
    Header,
    SwapTab,
    Tab,
    Buttons
  ],
  templateUrl: './list-project-page.html',
  styleUrl: './list-project-page.css',
})
export class ListProjectPage {
    projectExample: ProjetModel = projetsMock[0];
  



}
