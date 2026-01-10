import { Component, input, signal } from '@angular/core';
import { isProjet, ProjetModel } from '../../../models/projet-model';
import { isService, ServiceModel } from '../../../models/service-model';
import { isUtilisateur, UtilisateurModel } from '../../../models/utilisateur-model';
import { CommonModule } from '@angular/common';
import { UpDownButton } from '../up-down-button/up-down-button';
import { StatusTab } from '../status-tab/status-tab';

@Component({
  selector: 'app-tab',
  imports: [
    CommonModule,
    UpDownButton,
    StatusTab
  ],
  templateUrl: './tab.html',
  styleUrl: './tab.css',
})
export class Tab {
  projectExample: ProjetModel = {
    id: 1,
    name: 'Projet test',
    services: [],
    createdAt: new Date()
  };
  ServiceExample: ServiceModel = {
    id: 'service1',
    name: 'Service Test',
    image: 'service-image',
    status: 'DOWN',
    ports: ['8080', '443']
  };
  UserExample: UtilisateurModel = {
    id: 1,
    username: 'user1',
    name: 'User Test',
    role: 'ADMIN'
  };

  InitStat = input<UtilisateurModel | ProjetModel | ServiceModel>(this.ServiceExample);
  projet = input<"PROJECT" | "USER" | "SERVICE">("SERVICE");
  PROJECT = signal<ProjetModel>({} as ProjetModel);
  USER = signal<UtilisateurModel>({} as UtilisateurModel);
  SERVICE = signal<ServiceModel>({} as ServiceModel);

  ngOnInit() {
    if(this.projet() == "PROJECT" && !isProjet(this.InitStat())){
      throw new Error("Invalid ProjetModel input");
    }
    else if(this.projet() == "USER" && !isUtilisateur(this.InitStat())){
      throw new Error("Invalid UtilisateurModel input");
    }
    else if(this.projet() == "SERVICE" && !isService(this.InitStat() )){
      throw new Error("Invalid ServiceModel input");
    }

    if (this.projet() == "PROJECT") {
      this.PROJECT.set(this.InitStat() as ProjetModel);
    }
    else if (this.projet() == "USER") {
      this.USER.set(this.InitStat() as UtilisateurModel);
    }
    else if (this.projet() == "SERVICE") {
      this.SERVICE.set(this.InitStat() as ServiceModel);
    }
  }


}
