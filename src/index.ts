import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { provisionRouter } from "./modules/provision/presentation/http/provistion.http.router.js";

const app = new Hono();

app.use("*", cors());
app.route("/api/v1", provisionRouter);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
