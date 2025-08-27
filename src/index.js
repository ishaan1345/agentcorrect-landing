export default {
  async fetch(request, env) {
    // Serve static assets
    return env.ASSETS.fetch(request);
  }
};