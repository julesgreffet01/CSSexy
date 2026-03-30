import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environnements/environnements';
import {tap, of, Observable, delay, throwError, map} from 'rxjs';
import {Router} from '@angular/router';
import {UtilisateurModel} from '../../models/utilisateur-model';
import {serviceUser} from './service-user';
import {usersMock} from '../../../mock/users.mjs';

interface loginOutput {
  Success: boolean;
  Data: {token: string};
}

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {

  private http = inject(HttpClient);
  private BASE_URL = environment.apiBaseUrl;
  private router = inject(Router);
  private userService = inject(serviceUser);

  private token: string | null = null;
  private UserName: string | null = null;
  private Name: string | null = null;
  private Role: "developer" | "admin" | "dev_ops" | null = null;
  private UserId: number | null = null;

  public getToken(): string | null {
    if(this.token) {
      return this.token;
    }
    this.token = localStorage.getItem('token');
    return this.token;
  }

  public setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public clearToken(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  public getUser(): Observable<UtilisateurModel> {
    if (this.UserId !== null && this.UserName !== null && this.Name !== null && this.Role !== null) {
      return of({
        Id: this.UserId,
        Username: this.UserName,
        Name: this.Name,
        Role: this.Role,
      });
    }

    return this.userService.myUser().pipe(
      tap(response => {
        this.UserId = response.Data.Id;
        this.UserName = response.Data.Username;
        this.Name = response.Data.Name;
        this.Role = response.Data.Role;
      }),map(res => {
        return{
          Id: res.Data.Id,
          Username: res.Data.Username,
          Name: res.Data.Name,
          Role: res.Data.Role,
        }

      })
    );
  }

  public login(userName: string, password: string) {
    // const utilisateur = usersMock.find(
    //   user => user.username === userName
    // );

    // if (utilisateur) {
    //   this.userId = utilisateur.id;
    //   this.name = utilisateur.name;
    //   this.role = utilisateur.role;
    //   this.userName = utilisateur.username; 
    //   return of(utilisateur).pipe(delay(100));
    // }
    //return throwError(() => new Error('Unable to login'));
    return this.http.post<loginOutput>(`https://api-culteur.greffetjules.com/auth/login`, { username: userName, password }).pipe(
       tap(res => {
        console.log(res);
         if(res.Data.token.trim().length > 0) {
           this.setToken(res.Data.token);
         }
      }),
     );
  }

  public logout(): void {
    this.clearToken();
    this.UserId = null;
    this.UserName = null;
    this.Role = null;
    this.Name = null;
    this.router.navigate(['/login'], {replaceUrl: true});
  }
}
