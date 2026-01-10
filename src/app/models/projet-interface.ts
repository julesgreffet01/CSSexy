import {ServiceModel} from './service-model';

export interface ProjetModel {
  id: number;
  name: string;
  services: ServiceModel[]
  createdAt: Date;
}

export function isProjet(obj: any): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "name" in obj &&
    "services" in obj &&
    "createdAt" in obj &&
    typeof (obj as any).id === "number" &&
    typeof (obj as any).name === "string" &&
    typeof (obj as any).services === "object" &&
    typeof (obj as any).createdAt === "object"
  );
}
