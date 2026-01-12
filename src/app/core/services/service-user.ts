import { inject, Injectable } from "@angular/core";
import {Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environnements/environnements";
import { UtilisateurModel } from "../../models/utilisateur-model";
import {usersMock} from '../../../mock/users.mjs';

@Injectable({
    providedIn: "root",
})
export class serviceUser {
    private readonly http = inject(HttpClient);
    private baseUrl = environment.apiBaseUrl + '/users';


    public getAllUsers(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/`);
    }

    public getUser(user_uuid: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${user_uuid}`);
    }

    public myUser(): Observable<UtilisateurModel> {
      return of(usersMock[0]);
        // return this.http.get<UtilisateurModel>(`${this.baseUrl}/me`);
    }
}
