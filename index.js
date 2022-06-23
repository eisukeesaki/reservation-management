const express = require("express");
const session = require("express-session");
const { logRequest } = require("./src/utils/logging/logger");
const path = require("path");
const authRoutes = require("./src/routes/auth");

const port = 4242;

const app = express();

app.use(session({
  secret: "a-secret",
  name: "oauth-session",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "src", "views"));

app.use(authRoutes);

app.listen(port, () => {
  console.log("server is listening to port %d\n", port)
});

