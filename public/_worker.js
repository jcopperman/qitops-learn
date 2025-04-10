// This is a minimal worker that proxies requests to the static assets
export default {
  async fetch(request, env, ctx) {
    // Get the URL from the request
    const url = new URL(request.url);
    
    // If the URL is for a static asset, serve it directly
    if (url.pathname.startsWith('/assets/') || 
        url.pathname.startsWith('/_assets/') || 
        url.pathname === '/favicon.ico' || 
        url.pathname === '/robots.txt') {
      return fetch(request);
    }
    
    // For all other requests, serve the index.html file
    return fetch(new URL('/index.html', url.origin));
  }
};
