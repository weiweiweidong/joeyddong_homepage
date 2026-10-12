const aliases = new Set(['www.joeyddong.top', 'joeyddong-site.top']);

export default {
  fetch(request, env) {
    const url = new URL(request.url);
    if (aliases.has(url.hostname)) {
      url.protocol = 'https:';
      url.hostname = 'joeyddong.top';
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
