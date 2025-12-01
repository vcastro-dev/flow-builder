import type { Blueprint } from "../entity/blueprint.entity.js";

export type ProvisioningRequested = {
  readonly name: "ProvisioningRequested";
  readonly data: Blueprint;
};

export const isProvisioningRequested = (
  event: unknown
): event is ProvisioningRequested => {
  return (
    typeof event === "object" &&
    event !== null &&
    "name" in event &&
    "data" in event
  );
};
