import {ServiceModel} from './service-model';

export interface ProjetModel {
  id: number;
  nom: string;
  services: ServiceModel[]
  createdAt: Date;
}

export function isProjet(obj: any): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "nom" in obj &&
    "services" in obj &&
    "createdAt" in obj &&
    typeof (obj as any).id === "number" &&
    typeof (obj as any).nom === "string" &&
    typeof (obj as any).services === "object" &&
    typeof (obj as any).createdAt === "object"
  );
}
