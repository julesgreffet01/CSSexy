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
    typeof obj.Uuid === "string" &&
    typeof obj.Name === "string" &&
    typeof obj.Image === "string" &&
    SERVICE_STATUS.includes(obj.Status) &&
    Array.isArray(obj.Ports) &&
    obj.Ports.every((p: unknown) => typeof p === "string") &&
    (
      obj.StartedSince === undefined ||
      obj.StartedSince instanceof Date ||
      (typeof obj.StartedSince === "string" && !isNaN(Date.parse(obj.StartedSince)))
    )
  );
}
