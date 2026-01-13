import {ServiceModel} from "../app/models/service-model";

export const servicesMock: ServiceModel[] = [
  {
    id: "1",
    name: 'Service app php',
    image: "php:8.1-apache",
    status: "UP",
    startedSince: new Date('2023-03-01T10:00:00Z'),
    ports: ["80:80", "443:443", "443:443", "443:443"]
  },
  {
    id: "2",
    name: 'Service base de données',
    image: "mysql:5.7",
    status: "UP",
    startedSince: new Date('2023-03-01T10:05:00Z'),
    ports: ["3306:3306"]
  },
  {
    id: "3",
    name: 'Service App nodejs',
    image: "nodejs::latest",
    status: "UP",
    ports: ["80:80"]
  }
];
