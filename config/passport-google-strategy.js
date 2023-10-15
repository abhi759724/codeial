const passport = require("passport");
const User = require("../models/user");
const crypto = require("crypto");
const googleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new googleStrategy(
    {
      clientID:
        "768472767177-s58dju49k8a3dedr678ur14rdc3aolrl.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:9000/users/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("inside try");
        const user = await User.findOne({
          email: profile.emails[0].value,
        });
        if (user) {
          return done(null, user);
        } else {
          const newUser = User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            password: crypto.randomBytes(20).toString("hex"),
          });
          return done(null, newUser);
        }
      } catch (err) {
        console.error(`Error in Google Strategy ${err}`);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

// deseerialize the user from the key in the cookies

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (user) {
    return done(null, user);
  }
});
module.exports = passport;
