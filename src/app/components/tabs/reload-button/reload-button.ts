import { Component, inject, input } from '@angular/core';
import { ServiceModel } from '../../../models/service-model';
import { serviceServices } from '../../../core/services/service-services';
import { ProjetModel } from '../../../models/projet-model';
import { ServiceProjet } from '../../../core/services/service-projet';
@Component({
  selector: 'app-reload-button',
  imports: [],
  templateUrl: './reload-button.html',
  styleUrl: './reload-button.css',
  standalone: true,
})
export class ReloadButton {
  projectToReload = input<ProjetModel>();
  projectServices = new ServiceProjet();
  Project = inject(ServiceProjet);
  serviceToReload = input<ServiceModel>();
  serviceServices = new serviceServices();
  Service = inject(serviceServices);

  reload(): void {
    if (this.projectToReload) {
      this.Project.restartProject(this.projectToReload()!.id).subscribe({
        next: () => {
          console.log(`Project ${this.projectToReload()!.id} reloaded successfully.`);
        },
        error: (err) => {
          console.error(`Failed to reload project ${this.projectToReload()!.id}:`, err);
        },
      });
    } 
    else if (this.serviceToReload) {
      this.Service.restartService(this.serviceToReload()!.id).subscribe({
        next: () => {
          console.log(`Service ${this.serviceToReload()!.id} reloaded successfully.`);
        },
        error: (err) => {
          console.error(`Failed to reload service ${this.serviceToReload()!.id}:`, err);
        },
      });
    }
  }
}
