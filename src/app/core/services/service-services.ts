import { inject, Injectable } from "@angular/core";
import { ServiceModel } from "../../models/service-model";
import {delay, Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {servicesMock} from '../../../mock/services.mjs';

@Injectable({
    providedIn: "root",
})
export class serviceServices {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = "/services";

    public getServices(service_uuid: string): Observable<ServiceModel | undefined> {
      //return this.http.get<ServiceModel>(`${this.baseUrl}/${service_uuid}`);
      return of(servicesMock.find(s => s.id === service_uuid)).pipe(delay(200));
    }

    public updateService(service: ServiceModel): Observable<ServiceModel> {
        return this.http.put<ServiceModel>(`${this.baseUrl}/${service.id}`, service);
    }

    public deleteService(service_uuid: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${service_uuid}`);
    }

    public startService(service_uuid: string): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/${service_uuid}/start`, {});
    }

    public stopService(service_uuid: string): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/${service_uuid}/stop`, {});
    }

    public restartService(service_uuid: string): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/${service_uuid}/restart`, {});
    }

    public serviceMonitoring(service_uuid: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${service_uuid}/monitoring`);
    }

    public serviceMonitoringDetails(service_uuid: string, name: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${service_uuid}/monitoring/${name}`);
    }

    public serviceDefMonitoring(service_uuid: string): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${service_uuid}/monitoring`, {});
    }

    public serviceMonitoringIndactors(service: ServiceModel, name: string): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/${service.id}/monitoring/${name}`, service);
    }

    public serviceMonitoringMesures(service_uuid: string, name: string, datetime: Date): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${service_uuid}/monitoring/${name}/mesures/${datetime.toISOString()}`);
    }
}
