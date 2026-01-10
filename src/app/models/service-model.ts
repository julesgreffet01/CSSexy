export interface ServiceModel {
  id: string;
  nom: string;
  image: string;
  status: "UP" | "DOWN" | "STARTING" | "STOP";
  startedSince?: Date;
  ports: string[];
}

export function isService(obj: any): obj is ServiceModel {
  const SERVICE_STATUS = ["UP", "DOWN", "STARTING", "STOP"];
  return (
    typeof obj.id === "string" &&
    typeof obj.nom === "string" &&
    typeof obj.image === "string" &&
    SERVICE_STATUS.includes(obj.status) &&
    Array.isArray(obj.ports) &&
    obj.ports.every((p: unknown) => typeof p === "string") &&
    (
      obj.startedSince === undefined ||
      obj.startedSince instanceof Date ||
      (typeof obj.startedSince === "string" && !isNaN(Date.parse(obj.startedSince)))
    )
  );
}
