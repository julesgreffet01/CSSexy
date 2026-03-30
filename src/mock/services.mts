import {ServiceModel} from "../app/models/service-model";

export const servicesMock: ServiceModel[] = [
  {
    Uuid: "1",
    Name: 'Service app php',
    Image: "php:8.1-apache",
    Status: "up",
    StartedSince: new Date('2023-03-01T10:00:00Z'),
    Ports: ["80:80", "443:443"]
  },
  {
    Uuid: "2",
    Name: 'Service base de données',
    Image: "mysql:5.7",
    Status: "up",
    StartedSince: new Date('2023-03-01T10:05:00Z'),
    Ports: ["3306:3306"]
  },
  {
    Uuid: "3",
    Name: 'Service App nodejs',
    Image: "nodejs::latest",
    Status: "up",
    Ports: ["80:80"]
  }
];
