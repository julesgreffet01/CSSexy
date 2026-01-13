import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurModel } from '../../models/utilisateur-model';
import { ServiceAuth } from '../../core/services/service-auth';

@Component({
  selector: 'app-profil-page',
  imports: [],
  templateUrl: './profil-page.html',
  styleUrl: './profil-page.css',
})
export class ProfilPage {
  serviceAuth = inject(ServiceAuth);
  route = inject(ActivatedRoute);
  currentUser = signal<UtilisateurModel | undefined>(undefined);
  loading = signal<boolean>(true);
  errorProject = signal<boolean>(false);

  ngOnInit(): void {
    this.serviceAuth.getUser().subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorProject.set(true);
        this.loading.set(false);
        console.log(err);
      },
    });
  }
}
