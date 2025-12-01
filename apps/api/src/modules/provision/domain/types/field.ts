import type { AllowedTypes } from "./allowed-types.js";

export type Field = {
  name: string;
  required: boolean;
  type: AllowedTypes;
  unique: boolean;
};
