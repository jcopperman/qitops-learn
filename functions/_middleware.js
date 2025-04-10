import { createRequestHandler } from "@remix-run/cloudflare";
import * as build from "../build/server/index.js";

export const onRequest = async ({ request, env, context }) => {
  try {
    const requestHandler = createRequestHandler({
      build,
      mode: process.env.NODE_ENV,
      getLoadContext: () => ({
        env,
        context,
      }),
    });

    return requestHandler(request);
  } catch (error) {
    console.error("Error in middleware:", error);
    return new Response("Server Error", { status: 500 });
  }
};
