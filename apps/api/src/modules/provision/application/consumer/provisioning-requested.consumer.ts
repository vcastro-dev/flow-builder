import { isProvisioningRequested } from "../../domain/events/provisioning-requested.event.js";
import type { CreateTypesFileFromBlueprintFn } from "../use-case/generate-type-from-blueprint.use-case.js";

export const provisioningRequestedConsumer = (
  createTypesFile: CreateTypesFileFromBlueprintFn
) => {
  return async (event: unknown) => {
    if (!isProvisioningRequested(event)) {
      return;
    }

    const outputPath = `./generated/${event.data.name}.ts`;

    createTypesFile(event.data, outputPath);
  };
};
