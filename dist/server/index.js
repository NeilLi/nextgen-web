export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    if (!url.pathname.includes(".")) {
      url.pathname = url.pathname.endsWith("/")
        ? `${url.pathname}index.html`
        : `${url.pathname}.html`;
      return env.ASSETS.fetch(new Request(url, request));
    }

    return response;
  },
};
