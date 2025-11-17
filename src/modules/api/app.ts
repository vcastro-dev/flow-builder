import { Hono } from "hono";
import { provisionRoute } from "./routes/provision.js";

export const router = new Hono();
router.route("/provision", provisionRoute);
