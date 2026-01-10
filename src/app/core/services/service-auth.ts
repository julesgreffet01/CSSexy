import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environnements/environnements';

@Injectable({
  providedIn: 'root',
})
export class ServiceAuth {

  private http = inject(HttpClient);
  private BASE_URL = environment.apiBaseUrl;

  private token: string | null = null;
  private userName: string | null = null;
  private name: string | null = null;
  private role: "DEV" | "ADMIN" | "DEV_OPS" | null = null;

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

  public login(userName: string, password: string) {
    return this.http.post<any>(`${this.BASE_URL}/auth/login`, { userName, password });
  }
}
