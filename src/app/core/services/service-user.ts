import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {UtilisateurModel} from '../../models/utilisateur-model';

@Injectable({
    providedIn: "root",
})
export class serviceUser {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = "/users";


    public getAllUsers(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/`);
    }

    public getUser(user_uuid: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${user_uuid}`);
    }

    public myUser(): Observable<UtilisateurModel> {
        return this.http.get<UtilisateurModel>(`${this.baseUrl}/me`);
    }
}
