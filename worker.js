// worker.js
export default {
  async fetch(request, env, ctx) {
    try {
      // 1. Handle different HTTP methods
      if (request.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
      }

      // 2. List files in R2 bucket
      const results = await env.OCR_STORAGE.list();
      
      // 3. Return formatted JSON response
      return new Response(JSON.stringify({
        success: true,
        objects: results.objects
      }), {
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (err) {
      // 4. Error handling
      return new Response(JSON.stringify({
        success: false,
        error: err.message
      }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
}
