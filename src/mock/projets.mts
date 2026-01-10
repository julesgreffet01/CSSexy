import type {ProjetModel} from "../app/models/projet-model";
import {servicesMock} from "./services.mjs";

export const projetsMock: ProjetModel[] = [
  {
    id: 1,
    name: 'Projet Alpha',
    services: [servicesMock[0], servicesMock[1]],
    createdAt: new Date('2023-03-01T09:00:00Z')
  },
  {
    id: 2,
    name: 'Projet Beta',
    services: [servicesMock[2]],
    createdAt: new Date('2023-04-15T14:30:00Z')
  },
];
