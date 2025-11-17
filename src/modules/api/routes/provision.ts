import { Hono } from "hono";

export const provisionRoute = new Hono();

provisionRoute.get("/", (c) => {
  return c.text("Provision route is working!");
});
