// This is a workaround to manually enable Node.js compatibility
export default {
  async fetch(request, env, ctx) {
    // Check if this worker is being executed with nodejs_compat
    if (typeof process === 'undefined') {
      return new Response("This worker requires the nodejs_compat flag to be enabled.", { 
        status: 500 
      });
    }
    
    // Import and run the actual worker
    const { default: actualWorker } = await import('./dist/_worker.js');
    return actualWorker.fetch(request, env, ctx);
  }
};
