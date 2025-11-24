import { isProvisioningRequested } from "../../domain/events/provisioning-requested.event.js";
import type { CreateTypesFileFromBlueprintFn } from "../use-case/generate-type-from-blueprint.use-case.js";

export const provisioningRequestedConsumer = (
  createTypesFile: CreateTypesFileFromBlueprintFn
) => {
  return async (event: unknown) => {
    console.log(
      `[PROVISIONING REQUESTER CONSUMER] Received event: ${JSON.stringify(
        event
      )}`
    );

    console.log(
      `[PROVISIONING REQUESTER CONSUMER] Validating event type...`,
      event
    );
    if (!isProvisioningRequested(event)) {
      console.warn(
        "[PROVISIONING REQUESTER CONSUMER] Event is not of type ProvisioningRequested. Skipping."
      );
      return;
    }

    try {
      console.log(
        `[PROVISIONING REQUESTER CONSUMER] Processing blueprint: ${event.data.name}`
      );

      const outputPath = `./generated/${event.data.name}.ts`;

      createTypesFile(event.data, outputPath);

      console.log(
        `[PROVISIONING REQUESTER CONSUMER] Successfully generated types file at: ${outputPath}`
      );
    } catch (error) {
      console.error(
        `[PROVISIONING REQUESTER CONSUMER] Error generating types file for blueprint: ${event.data.name}`,
        error
      );
    }
  };
};
