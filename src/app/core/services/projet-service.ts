import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environnements/environnements';
import {projetsMock} from '../../../mock/projets.mjs';
import {delay, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjetService {

  private http = inject(HttpClient)
  private basUrl = environment.apiBaseUrl + 'projects';

  getAllProjets() {
    return of(projetsMock).pipe(delay(200));
    // return this.http.get<any[]>(this.basUrl);  //pour quand on aura une api
  }

  findProjectById(id: number) {
    return of(projetsMock.find(projet => projet.id === id)).pipe(delay(200));
  }

}
