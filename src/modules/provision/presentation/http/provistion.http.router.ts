import { Hono } from "hono";
import z from "zod";
import { CreateProvisionDTO } from "../dto/create-provision.dto.js";
import { provisionUseCases } from "../../provision.composition.js";

export const provisionRouter = new Hono().basePath("/provision");

const { createTypesFile } = provisionUseCases;

provisionRouter.get("/health", (c) => {
  return c.json({ status: "ok" });
});

provisionRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const blueprintData = CreateProvisionDTO.parse(body);

    const outputPath = "./dist/generated";

    await createTypesFile(blueprintData, outputPath);

    return c.json({ message: "Recurso provisionado com sucesso!" }, 201);
  } catch (error) {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 500);
    } else if (error instanceof z.ZodError) {
      return c.json(
        { message: "Invalid request body", errors: error.issues },
        400
      );
    }
  }
});
