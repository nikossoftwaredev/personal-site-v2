const session = require("express-session");
const cookieparser = require("cookie-parser");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const privateConfig = require("config/private.json");

// export a function that receives the Express app we will configure for Passport
const initPassport = (app) => {
  // these two middlewares are required to make passport work with sessions
  // sessions are optional, but an easy solution to keeping users
  // logged in until they log out.
  app.use(cookieparser());
  app.use(
    session({
      // this should be changed to something cryptographically secure for production
      secret: privateConfig.secret,
      resave: false,
      saveUninitialized: false,
      // automatically extends the session age on each request. useful if you want
      // the user's activity to extend their session. If you want an absolute session
      // expiration, set to false
      rolling: true,
      name: "sid",
      cookie: {
        httpOnly: true,
        maxAge: 20 * 60 * 1000, // 20 minutes
        // domain: 'your.domain.com',
        // recommended you use this setting in production if your site is published using HTTPS
        // secure: true,
      },
    })
  );

  // this tells passport to use the "local" strategy, and configures the strategy
  // with a function that will be called when the user tries to authenticate with
  // a username and password.
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username }, async (err, user) => {
        if (err) {
          return done(err);
        }
        // User not found
        if (!user) {
          return done({ message: "Username doesn't exist" });
        }

        try {
          // Always use hashed passwords and fixed time comparison
          if (await bcrypt.compare(password, user.password.bcrypt)) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password incorrect" });
          }
        } catch (e) {
          done(e);
        }
      });
    })
  );

  // Only necessary when using sessions.
  // This tells Passport how or what data to save about a user in the session cookie.
  // It's recommended you only serialize something like a unique username or user ID.
  // I prefer user ID.
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Only necessary when using sessions.
  // This tells Passport how to turn the user ID we serialize in the session cookie
  // back into the actual User record from our Mongo database.
  // Here, we simply find the user with the matching ID and return that.
  // This will cause the User record to be available on each authenticated request via the req.user property.
  passport.deserializeUser((userId, done) => {
    User.findById(userId)
      .then((user) => {
        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  });

  // initialize passport. this is required, after you set up passport but BEFORE you use passport.session (if using)
  app.use(passport.initialize());
  // only required if using sessions. this will add middleware from passport
  // that will serialize/deserialize the user from the session cookie and add
  // them to req.user
  app.use(passport.session());
};

module.exports = initPassport;
