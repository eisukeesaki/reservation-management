const { logRequest, logResponse } = require("../utils/logging/logger");
const lgr = require("../utils/logging/logger").logger;
require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const router = require("express").Router();
const { userService } = require("../services");

passport.use(new GoogleStrategy(
  {
    clientID: process.env["GOOGLE_CLIENT_ID"],
    clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
    callbackURL: "http://localhost:4242/oauth2/redirect/google",
    scope: ["profile"],
    passReqToCallBack: true
  },
  function verify(accessToken, refreshToken, profile, done) {
    const user = {
      id: profile.id,
      username: profile.displayName,
    };

    userService.createUser(user.id, user.username);
    return done(null, user);
  }
));

passport.serializeUser(function(user, cb) {
  lgr.info("serializeUser", user);
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  lgr.info("deserializeUser", user);
  process.nextTick(function() {
    return cb(null, user);
  });
});

router.all("/", logRequest);

router.get("/", (req, res) => {
  if (req.session.passport) {
    const seshUser = req.session.passport.user;
    const storedUser = userService.getUserById(seshUser && seshUser.id);

    if (!storedUser) {
      lgr.info("user does not exist in db. redirecting to /login/federated/google");
      return res.redirect("/login/federated/google");
    }
  }
  else {
    lgr.info("session does not exist. redirecting to /login/federated/google");
    return res.redirect("/login/federated/google");
  }

  res.render("home.ejs", { user: { username: req.session.passport.user.username } });
});

router.get("/login",
  (req, res) => {
    res.render("login");
  }
);

router.get("/login/federated/google",
  (req, res, next) => {
    lgr.info("initiating OAuth flow ...");
    next();
  },
  passport.authenticate("google")
);

router.get("/oauth2/redirect/google",
  passport.authenticate("google", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login"
  })
);

module.exports = router;

/*

    GoogleStrategy()
        Strategy(options, verify) 
            constructor     │
                            └─ callback(accessToken, refreshToken, profile, done)
                                                                             └─ callback(error, user)

    passport
        passport = require("passport") = new Passport() = new Authenticator()
        .use()
            Authenticator
                this._strategies[name] = strategy;
                return this;

    passport-google-oauth20
        authenticates requests by delegating to Google
            uses OAuth 2.0 protocol

    Node
        event loop
            a tick
                1 loop
            process.nextTick()
                register callback
                    called asynchronously
                        after execution of the function that registered the callback
                        before next tick

*/

