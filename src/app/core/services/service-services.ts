import { inject, Injectable } from "@angular/core";
import type { ServiceModel } from "../../models/service-model";
import {delay, Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {servicesMock} from '../../../mock/services.mjs';
import { environment } from "../../environnements/environnements";
import { projetsMock } from "../../../mock/projets.mjs";

@Injectable({
    providedIn: "root",
})
export class serviceServices {
    private readonly http = inject(HttpClient);
    private baseUrl = 'services';
    private baseUrlProject = environment.apiBaseUrl + 'projects'
    private baseUrlService = environment.apiBaseUrl + 'services';

    public getAllByProject(projectId: number): Observable<{Success: boolean; Data: ServiceModel[]; Message: string}>{
        //return of(projetsMock.find(p => p.Id === projectId)?.services ?? []).pipe(delay(200));
        return this.http.get<{Success: boolean; Data: ServiceModel[]; Message: string}>
        (`${this.baseUrlProject}/${projectId}/${this.baseUrl}`)
    }

    public getServices(service_uuid: string): Observable<any> {
      return this.http.get<{Success: boolean; Data: ServiceModel; Message: string}>(`${this.baseUrlService}/${service_uuid}`);
      //return of(servicesMock.find(s => s.Uuid === service_uuid)).pipe(delay(200));

    }


  public createService(projectId: number, newService: ServiceModel) {
    newService.Uuid = crypto.randomUUID()
    servicesMock.push(newService);
    const projet = projetsMock.find(p => p.Id === projectId);
    if (!projet) {
      throw new Error(`Projet avec id ${projectId} introuvable`);
    }
    //projet.services.push(newService);
    return of(newService).pipe(delay(100));
  }

  public updateService(service: ServiceModel): Observable<ServiceModel> {
    // const existingService = servicesMock.find(s => s.Uuid === service.Uuid);

    // if (!existingService) {
    //   throw new Error(`Service ${service.Uuid} introuvable`);
    // }

    // existingService.Name = service.Name;
    // existingService.Image = service.Image;
    // existingService.Ports = service.Ports;
    // existingService.Status = service.Status;

    // return of(existingService).pipe(delay(200));
    return this.http.put<any>(`${this.baseUrlService}/${service.Uuid}`, {Name: service.Name});
  }

    public deleteService(service_uuid: string){
    // const serviceIndex = servicesMock.findIndex(
    // service => service.Uuid === service_uuid
    // );
    // if (serviceIndex !== -1) {
    //   servicesMock.splice(serviceIndex, 1);
    // }

    // projetsMock.forEach(projet => {
    //   //projet.services = projet.services.filter(
    //   //  service => service.id !== service_uuid
    //   //);
    // });

    // return of({ message: 'supprimé' }).pipe(delay(200));
    return this.http.delete<void>(`${this.baseUrlService}/${service_uuid}`);
    }

    public startService(service_uuid: string): Observable<void> {
        return this.http.post<void>(`${this.baseUrlService}/${service_uuid}/start`, {});
    }

    public stopService(service_uuid: string): Observable<void> {
        return this.http.post<void>(`${this.baseUrlService}/${service_uuid}/stop`, {});
    }

    public restartService(service_uuid: string): Observable<void> {
        return this.http.post<void>(`${this.baseUrlService}/${service_uuid}/restart`, {});
    }

    public serviceMonitoring(service_uuid: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrlService}/${service_uuid}/monitoring`);
    }

}
