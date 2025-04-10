import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "./server/index.js";

export default {
  async fetch(request, env, ctx) {
    try {
      // Handle static assets
      if (request.method === "GET" && new URL(request.url).pathname.startsWith("/assets/")) {
        return env.ASSETS.fetch(request);
      }

      // Handle Remix requests
      const requestHandler = createRequestHandler({
        build,
        mode: "production",
        getLoadContext: () => ({
          env,
          ctx,
        }),
      });

      return requestHandler(request);
    } catch (error) {
      console.error("Error in worker:", error);
      return new Response("Server Error", { status: 500 });
    }
  },
};
