import express from "express";
import dotenv from "dotenv";
import path from "path";

import { fileURLToPath } from "url";

import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();
const port = 3000;

const rapidApiKey = process.env.SHAZAM_API_KEY ?? "";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.use(
  "/shazam",
  createProxyMiddleware({
    target: "https://shazam.p.rapidapi.com",
    changeOrigin: true,
    pathRewrite: {
      "^/shazam": "",
    },
    on: {
      proxyReq: (proxyReq, req) => {
        console.log(`Proxying request: ${req.method} ${req.url}`);
        proxyReq.setHeader("x-rapidapi-key", rapidApiKey);
        proxyReq.setHeader("x-rapidapi-host", "shazam.p.rapidapi.com");
      },
    },
  }),
);

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`App listening on port ${port} 🚀`);
});
