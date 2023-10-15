const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_controller");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.userProfile
);
router.post("/update/:id", passport.checkAuthentication, userController.update);

router.get("/signin", userController.signin);
router.get("/signup", userController.signup);

router.post("/create", userController.create);
router.post(
  "/createSession",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  userController.createSession
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/users/signin" }),
  userController.createSession
);

router.get("/signout", userController.signout);
module.exports = router;
