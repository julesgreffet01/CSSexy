import { inject, Injectable } from "@angular/core";
import {delay, Observable, of} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environnements/environnements";
import { UtilisateurModel } from "../../models/utilisateur-model";
import {usersMock} from '../../../mock/users.mjs';

@Injectable({
    providedIn: "root",
})
export class serviceUser {
    private readonly http = inject(HttpClient);
    private baseUrl = environment.apiBaseUrl +'users';


    public getAllUsers(): Observable<{Success: boolean; Data: UtilisateurModel[]; Message: string}> {
       // return of(usersMock).pipe(delay(200));
        return this.http.get<{Success: boolean; Data: UtilisateurModel[]; Message: string}>(`${this.baseUrl}/`);
    }

    public getUser(id: number): Observable<any> {
        //return of(usersMock.find(p => p.Id === id)).pipe(delay(200));
        return this.http.get<any>(`${this.baseUrl}/${id}`);
    }

    public myUser(): Observable<{Success: boolean; Data: UtilisateurModel; Message: string}> {
        //return of(usersMock[2]):
        return this.http.get<{Success: boolean; Data: UtilisateurModel; Message: string}>(`${this.baseUrl}/me`);
    }
}
