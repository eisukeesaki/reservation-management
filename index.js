const express = require("express");
const session = require("express-session");
const logger = require("morgan");
const authRoutes = require("./src/routes/auth");
const port = 4242;

const app = express();

app.use(logger("dev"));

app.use(session({
  secret: "a-secret",
  name: "oauth-session",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: false }));

app.use(authRoutes);

app.listen(port, () => {
  console.log("server is listening to port %d\n", port)
});

/*

const { userService } = require("./lib/services");

app.get("/", (req, res) => {
  if (req.session) {
    const user = userService.getUserById(req.session && req.session.userId);
    if (!user)
      res.redirect("https://accounts.google.com/o/oauth2/auth");
    // res.redirect("http://localhost:5000/validate"); // 5000 = oauthProvider
  }
  else
    return res.redirect("https://accounts.google.com/o/oauth2/auth");
  // return res.redirect("http://localhost:5000/validate"); // 5000 = oauthProvider

  res.end("if you received this message, you have a valid session");
});

app.get("/auth/google/callback", async (req, res) => {
  // const profile = (await axios.get(`http://localhost:5000/profile?token=${req.query.token}`)).data;
  const profile = (await axios.get(`https://oauth2.googleapis.com/token=${req.query.token}`)).data;
  const user = userService.createUser(profile.id, profile.username, profile.password);

  if (req.session)
    req.session.userId = user.id;

  res.redirect("/");
});

*/

