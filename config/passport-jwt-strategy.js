// const passport = require("passport");
// const JWTStrategy = require("passport-jwt").Strategy;
// const ExtractJWT = require("passport-jwt").ExtractJwt;

// // import models
// const User = require("../models/user");

// const opts = {
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
//   secretKey: "codeial",
// };
// passport.use(
//   new JWTStrategy(opts, async (jwtPayLoad, done) => {
//     const user = await User.findById(jwtPayLoad._id);
//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   })
// );

const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Codeial",
};

passport.use(
  new JWTStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log("Error in Passport Config" + err);
    }
  })
);

module.exports = passport;
