import { Hono } from "hono";
import { proxy } from "hono/proxy";

type Bindings = {
  SHAZAM_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/shazam/*", async (c) => {
  const apiPath = c.req.path.replace("/shazam/", "");
  const queries = Object.entries(c.req.queries())
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  console.log(`https://shazam.p.rapidapi.com/${apiPath}?${encodeURI(queries)}`);
  const res = await proxy(
    `https://shazam.p.rapidapi.com/${apiPath}?${encodeURI(queries)}`,
    {
      ...c.req,
      headers: {
        ...c.req.header(),
        "x-rapidapi-host": "shazam.p.rapidapi.com",
        "x-rapidapi-key": c.env.SHAZAM_API_KEY,
      },
    },
  );
  return res;
});

export default app;
