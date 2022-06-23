const bunyan = require("bunyan");
const path = require("path");

const level = process.env.LOGGING_LEVEL || "info";

const logger = bunyan.createLogger({
  name: "reservation management",
  streams: [
    {
      level,
      stream: process.stdout
    },
    {
      level,
      path: path.resolve(__dirname, "logs.json")
    }
  ]
});

function logRequest(req, res, next) {
  logger.info("request", {
    protocol: req.protocol,
    method: req.method,
    URL: req.originalUrl,
    query: req.query,
    params: req.params,
    cookies: req.cookies,
    headers: req.headers,
    body: req.body,
    session: req.session.passport
  });
  next();
}

function logResponse(req, res, next) {
  logger.info("response", {
    // routerStack: res.app._router.stack,
    params: res.app._router.params,
    _params: res.app._router._params,
    headersSent: res.headersSent,
    locals: res.locals
  });
  next();
}

module.exports = {
  logger,
  logRequest,
  logResponse
}

