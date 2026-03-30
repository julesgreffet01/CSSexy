import {ServiceModel} from './service-model';

export interface ProjetModel {
  Id: number;
  Name: string;
  CreatedAt: Date;
  User: any;
}
export type ProjetWithCount = ProjetModel & {
  serviceCount: number;
};

export function isProjet(obj: any): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "Id" in obj &&
    "Name" in obj &&
    "User" in obj &&
    "CreatedAt" in obj &&
    typeof (obj as any).Id === "number" &&
    typeof (obj as any).Name === "string" &&
    typeof (obj as any).User === "object" &&
    typeof (obj as any).CreatedAt === "object"
  );
}
