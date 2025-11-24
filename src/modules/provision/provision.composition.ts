import { generateTypeFromBlueprint } from "./application/use-case/generate-type-from-blueprint.use-case.js";
import { FileRepository } from "./infrastructure/repository/file-repository.js";

const createTypesFile = generateTypeFromBlueprint({
  fileRepository: FileRepository,
});

export const provisionUseCases = {
  createTypesFile,
};
