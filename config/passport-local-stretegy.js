const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

// passport.use(
//   new localStrategy(
//     {
//       UsernameField: "email",
//     },
//     async function (email, password, done) {
//       console.log(email, password);
//       try {
//         const user = await User.findOne({ email: email });
//         console.log(user);
//         if (!user || user.password != password) {
//           return done(null, false);
//         }
//         return done(null, user);
//       } catch (err) {
//         console.log("Error in finding the user");
//         return done(err);
//       }
//     }
//   )
// );

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },

    async (email, password, done) => {
      const user = await User.findOne({ email: email });
      if (!user || user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

// serializing the user to decide which key is to be kept in cookie

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

passport.checkAuthentication = (req, res, next) => {
  // if users is signed in, then pass on the request to the next function (Controllers Action);
  if (req.isAuthenticated()) {
    return next();
  }

  // if the user is not signed in
  return res.redirect("/users/signin");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are just
    // sending this to locals for the views
    res.locals.user = req.user;
  }
  next();
};
module.exports = passport;
