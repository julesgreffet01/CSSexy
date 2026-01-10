import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from '../components/header/header';
import {PopUpValidation} from '../components/popup/pop-up-validation/pop-up-validation';
import {ProjetModel} from '../models/projet-interface';
import {ServiceModel} from '../models/service-model';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Header,
    PopUpValidation,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  project: ProjetModel = {
    id: 1,
    name: 'Mon Projet',
    services: [],
    createdAt: new Date(),
  }

  newProject: ProjetModel = {
    id: 1,
    name: 'Mon Projet Modifié',
    services: [],
    createdAt: new Date(),
  }

  service: ServiceModel = {
    id: '1',
    name: 'Mon Service',
    ports: ['80', '443'],
    image: "bi",
    status: "UP",
  }

  newService: ServiceModel = {
    id: '1',
    name: 'Mon Service update',
    ports: ['20', '443', 'aa', 'bb', 'cc', 'dd', 'aa', 'aa', 'aa', 'aa',
    'aa', 'aa'],
    image: "bi",
    status: "UP",
  }
}
