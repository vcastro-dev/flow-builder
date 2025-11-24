import z from "zod";
import { ALLOWED_TYPES } from "../../domain/types/allowed-types.js";

const FieldSchema = z.object({
  name: z.string().min(1),
  type: z.enum([...ALLOWED_TYPES]),
  required: z.boolean().optional().default(false),
  unique: z.boolean().optional().default(false),
});

export const CreateProvisionDTO = z.object({
  name: z.string().min(1),
  fields: z.array(FieldSchema),
});

export type CreateProvisionDTO = z.infer<typeof CreateProvisionDTO>;
