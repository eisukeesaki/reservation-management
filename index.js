global.__r = __dirname;

const server = require("./src/app");
const port = process.env.PORT || 4242;
const { logger: l } = require("./src/utils/logging/logger");

server.listen(port, () => {
  l.info("server listening to port", port);
});

