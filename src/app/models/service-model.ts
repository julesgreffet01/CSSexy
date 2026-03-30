export interface ServiceModel {
  Uuid: string;
  Name: string;
  Image: string;
  Status: "up" | "down" | "starting" | "stop";
  StartedSince?: Date;
  Ports: string[];
}

export function isService(obj: any): obj is ServiceModel {
  const SERVICE_STATUS = ["up", "down", "starting", "stop"];
  return (
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
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
