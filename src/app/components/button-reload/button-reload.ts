import { Component, inject, input } from '@angular/core';
import { ServiceModel } from '../../models/service-model';
import { serviceServices } from '../../core/services/service-services';

@Component({
  selector: 'app-button-reload',
  imports: [],
  templateUrl: './button-reload.html',
  styleUrl: './button-reload.css',
})
export class ButtonReload {
  serviceMonitoringToReload = input.required<ServiceModel>();
  name = input.required<string>();
  serviceServices = new serviceServices();
  Service = inject(serviceServices);

  reload(): void {
      this.Service.serviceMonitoringReloadMesures(this.serviceMonitoringToReload().id, this.name()).subscribe({
        next: () => {
          console.log(`Service ${this.serviceMonitoringToReload()!.id} reloaded successfully.`);
        },
        error: (err) => {
          console.error(`Failed to reload service ${this.serviceMonitoringToReload()!.id}:`, err);
        },
      });
  }
}
