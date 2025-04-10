const { createRequestHandler } = require("@remix-run/netlify");
const build = require("../../build/server/index.js");

/**
 * A simple function that handles Remix requests
 * @param {Request} request
 * @returns {Promise<Response>}
 */
const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV
});

exports.handler = async (event, context) => {
  const response = await handler(
    new Request(event.rawUrl, {
      method: event.httpMethod,
      headers: event.headers,
      body: event.body ? Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8") : null
    })
  );

  const responseHeaders = Object.fromEntries(response.headers.entries());
  const responseBody = await response.text();

  return {
    statusCode: response.status,
    headers: responseHeaders,
    body: responseBody,
    isBase64Encoded: false
  };
};
