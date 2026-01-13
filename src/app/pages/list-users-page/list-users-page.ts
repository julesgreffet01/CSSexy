import { Component, inject, signal } from '@angular/core';
import { SwapTab } from '../../components/swap-tab/swap-tab';
import { Tab } from '../../components/tabs/tab/tab';
import { UtilisateurModel } from '../../models/utilisateur-model';
import { serviceUser } from '../../core/services/service-user';
import { ServiceModel } from '../../models/service-model';
import { ActivatedRoute } from '@angular/router';
import { ServiceAuth } from '../../core/services/service-auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-users-page',
  imports: [
    SwapTab,
    Tab,
    ],
  templateUrl: './list-users-page.html',
  styleUrl: './list-users-page.css',
})
export class ListUsersPage {

    serviceUser = inject(serviceUser);
    listUser = signal<ServiceModel[] | undefined>(undefined);
    route = inject(ActivatedRoute);
    loading = signal<boolean>(true);
    errorSignal = signal<boolean>(false);
    user$: Observable<UtilisateurModel>

    serviceAuth = inject(ServiceAuth)

    constructor(){
      this.user$ = this.serviceAuth.getUser()
    }
    ngOnInit(): void{
      this.serviceUser.getAllUsers().subscribe({
        next: (services) => {
        this.listUser.set(services);
            this.loading.set(false);
        },
        error: (err) => {
            this.errorSignal.set(true);
            this.loading.set(false);
        },
      });
    }

}
