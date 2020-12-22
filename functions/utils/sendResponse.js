const corsHeaders = {
  "content-type": "application/json;charset=utf-8",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, x-access-token",
};

module.exports = (statusCode = 200, body = {}, headers = {}) => ({
  statusCode,
  headers: {
    ...corsHeaders,
    ...headers,
  },
  body: Object.values(body || {}).length && JSON.stringify(body),
});
