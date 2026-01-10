import {ServiceModel} from './service-model';

export interface UtilisateurModel {
  id: number;
  username: string;
  name: string;
  role: "DEV" | "ADMIN" | "DEV_OPS";
}

export function isUtilisateur(obj: any): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "username" in obj &&
    "name" in obj &&
    "role" in obj &&
    typeof (obj as any).id === "number" &&
    typeof (obj as any).username === "string" &&
    typeof (obj as any).name === "string" &&
    typeof (obj as any).role === "string"
  );
}
