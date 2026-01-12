import { Component, inject, input, signal } from '@angular/core';
import { Tab } from '../../components/tabs/tab/tab';
import { Buttons } from '../../components/buttons/buttons';
import { servicesMock } from '../../../mock/services.mjs';
import { ServiceModel } from '../../models/service-model';
import { ServiceProjet } from '../../core/services/service-projet';
import { serviceServices } from '../../core/services/service-services';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjetModel } from '../../models/projet-model';

@Component({
  selector: 'app-detail-project-page',
  imports: [  
      Tab,
      Buttons],
  templateUrl: './detail-project-page.html',
  styleUrl: './detail-project-page.css',
})
export class DetailProjectPage {
  serviceProject = inject(ServiceProjet);
  serviceService = inject(serviceServices);
  route = inject(ActivatedRoute);
  currentProject = signal<ProjetModel | undefined>(undefined);
  loading = signal<boolean>(true);
  errorProject = signal<boolean>(false);


  
ngOnInit(): void{
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    const idToNumber = Number(id)
    if(idToNumber && !isNaN(idToNumber)){
       this.serviceProject.findProjectById(idToNumber).subscribe({
        next: (project) => {
          this.currentProject.set(project);
        }, 
        error: (err) => {
          
        },
       })
    }

  });
}
}
