import { Component, inject, signal } from '@angular/core';
import { serviceUser } from '../../core/services/service-user';
import { ActivatedRoute } from '@angular/router';
import { UtilisateurModel } from '../../models/utilisateur-model';

@Component({
  selector: 'app-detail-user-page',
  imports: [],
  templateUrl: './detail-user-page.html',
  styleUrl: './detail-user-page.css',
})
export class DetailUserPage {
  serviceUser = inject(serviceUser);
  route = inject(ActivatedRoute);
  currentUser = signal<UtilisateurModel | undefined>(undefined);
  loading = signal<boolean>(true);
  errorProject = signal<boolean>(false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
    const id = params.get('id');
    const idToNumber = Number(id);
    if (idToNumber && !isNaN(idToNumber)) {
        this.serviceUser.getUser(idToNumber).subscribe({
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
    });
  }
  goBack() {
    //TODO go back
  }
}
