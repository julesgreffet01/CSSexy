import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environnements/environnements';
import {projetsMock} from '../../../mock/projets.mjs';
import {delay, of} from 'rxjs';
import {type ProjetModel} from '../../models/projet-model';

@Injectable({
  providedIn: 'root',
})
export class ServiceProjet {

  private http = inject(HttpClient)
  private basUrl = environment.apiBaseUrl + 'projects';

  getAllProjets() {
    //return of(projetsMock).pipe(delay(200));
    return this.http.get<{Success: boolean; Data: ProjetModel[]; Message: string}>(this.basUrl); 
  }

  findProjectById(id: number) {
    //return of(projetsMock.find(p => p.Id === id)).pipe(delay(200));
    return this.http.get<{Success: boolean; Data: ProjetModel; Message: string}>(this.basUrl + '/' + id)
  }

  createProjet(projet: ProjetModel) {
    //projet.Id = Math.floor(Math.random() * 1000);
    //projetsMock.push(projet);
    //return of(projetsMock).pipe(delay(200));
    return this.http.post<any>(this.basUrl, {name: projet.Name, userId: 2});
  }

  updateProjet(projet: ProjetModel) {
    //projetsMock.forEach((p: ProjetModel) => {
    //  if (p.Id === projet.Id) {
    //    p.Name = projet.Name;
    //    p.User = projet.User;
    //  }
    //})
    //return of({message: `pudate reussi sur le projet ${projet.Id}`}).pipe(delay(200));
    return this.http.put<any>(this.basUrl + '/' + projet.Id, {name: projet.Name, userId: 2});
  }

  deleteProjet(id: number) {
    projetsMock.forEach((projet, index) => {
      if (projet.Id === id) {
        projetsMock.splice(index, 1);
      }
    });
    return of({message: `delete success on id ${id}`}).pipe(delay(200));
    // return this.http.delete<any>(this.basUrl + '/' + id);
  }
}
