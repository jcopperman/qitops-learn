import { createRequestHandler } from "@remix-run/express";
import express from "express";
import compression from "compression";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import * as build from "./build/server/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUILD_DIR = join(__dirname, "build/client");

const app = express();

// Use compression for all requests
app.use(compression());

// Serve static assets
app.use(express.static(BUILD_DIR, {
  maxAge: "1y",
  immutable: true
}));

// Handle Remix requests
app.all(
  "*",
  createRequestHandler({
    build,
    mode: process.env.NODE_ENV
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
