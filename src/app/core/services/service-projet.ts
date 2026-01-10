import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environnements/environnements';
import {projetsMock} from '../../../mock/projets.mjs';
import {delay, of} from 'rxjs';
import {ProjetModel} from '../../models/projet-model';

@Injectable({
  providedIn: 'root',
})
export class ServiceProjet {

  private http = inject(HttpClient)
  private basUrl = environment.apiBaseUrl + 'projects';

  getAllProjets() {
    return of(projetsMock).pipe(delay(200));
    // return this.http.get<any[]>(this.basUrl);  pour quand on aura une api
  }

  findProjectById(id: number) {
    return of(projetsMock.find(p => p.id === id)).pipe(delay(200));
  }

  createProjet(projet: ProjetModel) {
    projet.id = Math.floor(Math.random() * 1000);
    projetsMock.push(projet);
    return of(projetsMock).pipe(delay(200));
    // return this.http.post<any>(this.basUrl + '/' + projet.id, projet);
  }

  updateProjet(projet: ProjetModel) {
    projetsMock.forEach((p: ProjetModel) => {
      if (p.id === projet.id) {
        p.name = projet.name;
        p.services = projet.services;
      }
    })
    return of({message: `pudate reussi sur le projet ${projet.id}`}).pipe(delay(200));
    // return this.http.put<any>(this.basUrl + '/' + projet.id, projet);
  }

  deleteProjet(id: number) {
    projetsMock.forEach((projet, index) => {
      if (projet.id === id) {
        projetsMock.splice(index, 1);
      }
    });
    return of({message: `delete success on id ${id}`}).pipe(delay(200));
    // return this.http.delete<any>(this.basUrl + '/' + id);
  }
}
