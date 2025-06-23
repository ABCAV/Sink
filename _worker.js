// This worker acts as a compatibility layer for Node.js modules
export default {
  async fetch(request, env, ctx) {
    // Enable Node.js compatibility at runtime
    globalThis.process = globalThis.process || { env: {} };
    globalThis.Buffer = globalThis.Buffer || { 
      from: () => new Uint8Array(),
      isBuffer: () => false
    };
    
    try {
      // Log the request for debugging
      console.log("Request received, path:", new URL(request.url).pathname);
      
      // Handle requests to the root path
      if (new URL(request.url).pathname === "/") {
        return fetch(request);
      }
      
      // Route to the worker
      return fetch(request);
    } catch (error) {
      // Return a detailed error for debugging
      return new Response(`Error in worker: ${error.message}\n${error.stack}`, { 
        status: 500,
        headers: { "Content-Type": "text/plain" }
      });
    }
  }
}
