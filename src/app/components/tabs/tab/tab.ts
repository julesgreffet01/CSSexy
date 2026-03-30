import { Component, inject, input, signal } from '@angular/core';
import { ProjetModel, ProjetWithCount } from '../../../models/projet-model';
import { ServiceModel } from '../../../models/service-model';
import { UtilisateurModel } from '../../../models/utilisateur-model';
import { CommonModule } from '@angular/common';
import { UpDownButton } from '../up-down-button/up-down-button';
import { StatusTab } from '../status-tab/status-tab';
import { ReloadButton } from '../reload-button/reload-button';
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

  InitStat = input.required<UtilisateurModel[] | ProjetWithCount[] | ServiceModel[]>();
  projet = input<"PROJECT" | "USER" | "SERVICE">("SERVICE");
  PROJECT = signal<ProjetWithCount[]>([] as ProjetWithCount[]);
  USER = signal<UtilisateurModel[]>([] as UtilisateurModel[]);
  SERVICE = signal<any>([] as any[]);
  routeur = inject(Router)

  ngOnInit() {   
    if (this.projet() == "PROJECT") {
      this.PROJECT.set(this.InitStat() as ProjetWithCount[]);
    }
    else if (this.projet() == "USER") {
      this.USER.set(this.InitStat() as UtilisateurModel[]);
    }
    else if (this.projet() == "SERVICE") {
      this.SERVICE.set(this.InitStat());
    }
  }


  onRowClickUser(user: UtilisateurModel){
    this.routeur.navigate(['/user-detail', user.Id])
  }
  onRowClickProject(project: ProjetWithCount){
    this.routeur.navigate(['/project', project.Id])
  }
  onRowClickService(service: ServiceModel){
    this.routeur.navigate(['/service', service.Uuid])
  }
}
