// This file is needed to handle all routes
export const onRequest = async (context) => {
  // The actual handling is done in the _middleware.js file
  return context.next();
};
