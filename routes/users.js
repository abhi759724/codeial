const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_controller");

router.get(
  "/profile",
  passport.checkAuthentication,
  userController.userProfile
);
router.get("/signin", userController.signin);
router.get("/signup", userController.signup);
router.get("/register", userController.register);
router.get("/signout", userController.signout);
router.post("/create", userController.create);
router.post(
  "/createSession",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  userController.createSession
);
module.exports = router;
