import { createRequestHandler } from "@remix-run/netlify";
import * as build from "../../build/server/index.js";

/**
 * A simple function that handles Remix requests
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export const handler = async (event, context) => {
  // For client-side routing, we need to rewrite the path to the root
  // This ensures that all routes are handled by the Remix app
  try {
    // Create a request object from the Netlify event
    const request = new Request(event.rawUrl, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body ? Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8") : null
    });

    // Create a Remix request handler
    const handleRequest = createRequestHandler({
      build,
      mode: process.env.NODE_ENV
    });

    // Handle the request with Remix
    const response = await handleRequest(request);

    // Convert the response to a Netlify-compatible format
    const responseHeaders = Object.fromEntries(response.headers.entries());
    const responseBody = await response.text();

    return {
      statusCode: response.status,
      headers: responseHeaders,
      body: responseBody,
      isBase64Encoded: false
    };
  } catch (error) {
    console.error('Error handling request:', error);

    return {
      statusCode: 500,
      body: 'Internal Server Error',
      headers: { 'Content-Type': 'text/plain' }
    };
  }
};
