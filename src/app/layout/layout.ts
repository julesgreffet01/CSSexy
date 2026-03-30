import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from '../components/header/header';
import {ProjetModel} from '../models/projet-model';
import {ServiceModel} from '../models/service-model';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Header,
    // PopUpValidation,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  project: ProjetModel = {
    Id: 1,
    Name: 'Mon Projet',
    User: [],
    CreatedAt: new Date(),
  }

  newProject: ProjetModel = {
    Id: 1,
    Name: 'Mon Projet Modifié',
    User: [],
    CreatedAt: new Date(),
  }

  service: ServiceModel = {
    Uuid: '1',
    Name: 'Mon Service',
    Ports: ['80', '443'],
    Image: "bi",
    Status: "up",
  }

  newService: ServiceModel = {
    Uuid: '1',
    Name: 'Mon Service update',
    Ports: ['20', '443', 'aa', 'bb', 'cc', 'dd', 'aa', 'aa', 'aa', 'aa',
    'aa', 'aa'],
    Image: "bi",
    Status: "up",
  }
}
