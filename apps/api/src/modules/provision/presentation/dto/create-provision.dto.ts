import z from "zod";
import type { Blueprint } from "../../domain/entity/blueprint.entity.js";

const FieldSchema: z.Schema<Blueprint["fields"][number]> = z.object({
  name: z.string().min(1),
  type: z.enum(["string", "number", "boolean", "Date"]),
  required: z.boolean().optional().default(false),
  unique: z.boolean().optional().default(false),
});

export const CreateProvisionDTO: z.Schema<Blueprint> = z.object({
  name: z.string().min(1),
  fields: z.array(FieldSchema),
});

export type CreateProvisionDTO = z.infer<typeof CreateProvisionDTO>;
