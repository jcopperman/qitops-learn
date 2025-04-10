// Enhanced worker for Remix applications on Cloudflare Pages
export default {
  async fetch(request, env, ctx) {
    // Get the URL from the request
    const url = new URL(request.url);
    
    // If the URL is for a static asset, serve it directly
    if (url.pathname.startsWith('/assets/') || 
        url.pathname.startsWith('/_assets/') || 
        url.pathname.startsWith('/build/') || 
        url.pathname === '/favicon.ico' || 
        url.pathname === '/robots.txt') {
      return env.ASSETS.fetch(request);
    }
    
    try {
      // Try to fetch the actual resource first
      const response = await env.ASSETS.fetch(request);
      
      // If the response is not a 404, return it
      if (response.status !== 404) {
        return response;
      }
      
      // For 404 responses, serve the index.html file for client-side routing
      return env.ASSETS.fetch(new URL('/index.html', url.origin));
    } catch (error) {
      console.error('Error in worker:', error);
      
      // Fallback to index.html for any errors
      return env.ASSETS.fetch(new URL('/index.html', url.origin));
    }
  }
};
