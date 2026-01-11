import { Component, inject, input } from '@angular/core';
import { ServiceModel } from '../../../models/service-model';
import { serviceServices } from '../../../core/services/service-services';
@Component({
  selector: 'app-reload-button',
  imports: [],
  templateUrl: './reload-button.html',
  styleUrl: './reload-button.css',
  standalone: true
})
export class ReloadButton {
  serviceToReload = input.required<ServiceModel>();
  serviceServices = new serviceServices();
  Service = inject(serviceServices);

  reload(): void {

    this.Service.restartService(this.serviceToReload().id).subscribe({
      next: () => {
        console.log(`Service ${this.serviceToReload().id} reloaded successfully.`);
      },
      error: (err) => {
        console.error(`Failed to reload service ${this.serviceToReload().id}:`, err);
      }
    });
    
  }
}
