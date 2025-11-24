import { provisioningRequestedConsumer } from "./application/consumer/provisioning-requested.consumer.js";
import { generateTypeFromBlueprint } from "./application/use-case/generate-type-from-blueprint.use-case.js";
import type { Blueprint } from "./domain/entity/blueprint.entity.js";
import type { ProvisioningRequested } from "./domain/events/provisioning-requested.event.js";
import { createEventBus } from "./infrastructure/providers/event-bus.js";
import { FileRepository } from "./infrastructure/repository/file-repository.js";

const eventBus = createEventBus();
const { publish, subscribe } = eventBus;

const createTypesFile = generateTypeFromBlueprint({
  fileRepository: FileRepository,
});

const provisioningRequestHandler =
  provisioningRequestedConsumer(createTypesFile);

subscribe("ProvisioningRequested", provisioningRequestHandler);

export const requestProvisioning = (data: Blueprint) => {
  const event: ProvisioningRequested = {
    name: "ProvisioningRequested",
    data: data,
  };
  publish(event);
};
