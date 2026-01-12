import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environnements/environnements';
import {tap, of, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {UtilisateurModel} from '../../models/utilisateur-model';
import {serviceUser} from './service-user';

interface loginOutput {
  token: string;
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
  private userName: string | null = null;
  private name: string | null = null;
  private role: "DEV" | "ADMIN" | "DEV_OPS" | null = null;
  private userId: number | null = null;

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
    if (this.userId !== null && this.userName !== null && this.name !== null && this.role !== null) {
      return of({
        id: this.userId,
        username: this.userName,
        name: this.name,
        role: this.role,
      });
    }

    return this.userService.myUser().pipe(
      tap(user => {
        this.userId = user.id;
        this.userName = user.username;
        this.name = user.name;
        this.role = user.role;
      })
    );
  }

  public login(userName: string, password: string) {
    return this.http.post<loginOutput>(`${this.BASE_URL}/auth/login`, { userName, password }).pipe(
      tap(res => {
        if(res.token.trim().length > 0) {
          this.setToken(res.token);
        }
      }),
    );
  }

  public logout(): void {
    this.clearToken();
    this.userId = null;
    this.userName = null;
    this.role = null;
    this.name = null;
    this.router.navigate(['/login'], {replaceUrl: true});
  }
}
