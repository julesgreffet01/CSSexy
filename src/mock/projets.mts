import type {ProjetModel} from "../app/models/projet-model";
import {servicesMock} from "./services.mjs";

export const projetsMock: ProjetModel[] = [
  {
    Id: 1,
    Name: 'Projet Alpha',
    User: [servicesMock[0], servicesMock[1]],
    CreatedAt: new Date('2023-03-01T09:00:00Z')
  },
  {
    Id: 2,
    Name: 'Projet Beta',
    User: [servicesMock[2]],
    CreatedAt: new Date('2023-04-15T14:30:00Z')
  },
];
