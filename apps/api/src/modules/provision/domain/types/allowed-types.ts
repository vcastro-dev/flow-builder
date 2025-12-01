export const ALLOWED_TYPES = ["string", "number", "boolean", "Date"] as const;
export type AllowedTypes = (typeof ALLOWED_TYPES)[number];
