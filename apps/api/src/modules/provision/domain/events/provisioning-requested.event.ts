import type { Blueprint } from "../entity/blueprint.entity.js";

const PROVISIONING_REQUESTED_EVENT_NAME = "ProvisioningRequested";

type ProvisioningRequested = Readonly<{
  name: typeof PROVISIONING_REQUESTED_EVENT_NAME;
  data: Blueprint;
}>;

export const isProvisioningRequested = (
  event: unknown
): event is ProvisioningRequested => {
  if (typeof event === "object" && event !== null) return false;
  return (
    (event as ProvisioningRequested).name ===
      PROVISIONING_REQUESTED_EVENT_NAME &&
    typeof (event as ProvisioningRequested).data === "object" &&
    (event as ProvisioningRequested).data !== null
  );
};

export const createProvisioningRequestedEvent = (
  blueprint: Blueprint
): ProvisioningRequested => ({
  name: "ProvisioningRequested",
  data: blueprint,
});
