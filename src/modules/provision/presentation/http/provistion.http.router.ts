import { Hono } from "hono";
import z from "zod";
import { requestProvisioning } from "../../provision.composition.js";
import { CreateProvisionDTO } from "../dto/create-provision.dto.js";

export const provisionRouter = new Hono().basePath("/provision");

provisionRouter.get("/health", (c) => {
  return c.json({ status: "ok" });
});

provisionRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const data = CreateProvisionDTO.parse(body);

    await requestProvisioning(data);

    return c.json({ message: "Provisioning request received" }, 201);
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
