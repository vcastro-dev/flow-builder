type AllowedTypes = "string" | "number" | "boolean" | "Date";

type Field = {
  name: string;
  required: boolean;
  type: AllowedTypes;
  unique: boolean;
};

export interface Blueprint {
  name: string;
  fields: Field[];
}
