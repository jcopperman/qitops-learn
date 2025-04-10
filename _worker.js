import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "./build/server/index.js";

export default {
  async fetch(request, env, ctx) {
    const requestHandler = createRequestHandler({
      build,
      mode: process.env.NODE_ENV,
      getLoadContext: () => ({
        env,
        ctx,
      }),
    });

    return requestHandler(request);
  },
};
