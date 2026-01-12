import {Component, inject} from '@angular/core';
import {ServiceAuth} from '../../core/services/service-auth';
import type {Observable} from 'rxjs';
import type {UtilisateurModel} from '../../models/utilisateur-model';
import {AsyncPipe, NgOptimizedImage, TitleCasePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-status',
  imports: [
    AsyncPipe,
    TitleCasePipe,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './user-status.html',
  styleUrl: './user-status.css',
})
export class UserStatus {

  private serviceAuth = inject(ServiceAuth);
  user$: Observable<UtilisateurModel>
  authService = inject(ServiceAuth)

  constructor() {
    this.user$ = this.serviceAuth.getUser();
  }

  logout(){
    this.authService.logout();
  }


    image = '/account.svg';
}
