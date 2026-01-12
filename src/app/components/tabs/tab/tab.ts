import { Component, inject, input, signal } from '@angular/core';
import { isProjet, ProjetModel } from '../../../models/projet-model';
import { isService, ServiceModel } from '../../../models/service-model';
import { isUtilisateur, UtilisateurModel } from '../../../models/utilisateur-model';
import { CommonModule } from '@angular/common';
import { UpDownButton } from '../up-down-button/up-down-button';
import { StatusTab } from '../status-tab/status-tab';
import { ReloadButton } from '../reload-button/reload-button';
import { servicesMock } from '../../../../mock/services.mjs'; 
import { projetsMock } from '../../../../mock/projets.mjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab',
  imports: [
    CommonModule,
    UpDownButton,
    StatusTab,
    ReloadButton
  ],
  templateUrl: './tab.html',
  styleUrl: './tab.css',
})
export class Tab {

  InitStat = input.required<UtilisateurModel | ProjetModel | ServiceModel>();
  projet = input<"PROJECT" | "USER" | "SERVICE">("SERVICE");
  PROJECT = signal<ProjetModel>({} as ProjetModel);
  USER = signal<UtilisateurModel>({} as UtilisateurModel);
  SERVICE = signal<ServiceModel>({} as ServiceModel);
  routeur = inject(Router)

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


  onRowClickUser(user: UtilisateurModel){
    console.log("click")
  }
  onRowClickProject(project: ProjetModel){
    this.routeur.navigate(['/project', project.id])
  }
  onRowClickService(service: ServiceModel){
    console.log("click")
  }
}
