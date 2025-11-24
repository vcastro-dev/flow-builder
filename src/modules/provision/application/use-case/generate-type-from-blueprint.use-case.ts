import type { Blueprint } from "../../domain/entity/blueprint.entity.js";
import type { FileRepositoryPort } from "../port/FileRepository.port.js";

export const generateTypeContent = (blueprint: Blueprint) => {
  const { name, fields } = blueprint;

  const fieldsString = fields
    .map((field) => {
      const optionalMarker = field.required ? "" : "?";

      return `${field.name}${optionalMarker}: ${field.type};`;
    })
    .join("\n");

  return `export type ${name} = {\n${fieldsString}\n}`;
};

export type CreateTypesFileFromBlueprintFn = (
  blueprint: Blueprint,
  outputPath: string
) => Promise<void>;

export const generateTypeFromBlueprint = (dependencies: {
  fileRepository: FileRepositoryPort;
}): CreateTypesFileFromBlueprintFn => {
  return async (blueprint, outPath) => {
    const { fileRepository } = dependencies;

    const typeContent = generateTypeContent(blueprint);
    const filePath = `${outPath}/${blueprint.name}.ts`;

    await fileRepository.writeFile(filePath, typeContent);
  };
};
