const { logger: l } = require("./utils/logging/logger");
const express = require("express");
const session = require("express-session");
const app = module.exports = express();
const authRoutes = require("./routes/auth");

app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: "a-secret",
  name: "oauth-session",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.set("view engine", "ejs");
app.set("views", __r + "/src/views");

app.use(authRoutes);

