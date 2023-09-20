const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");
// const signIn = require("../controllers/user_profile");
// const signUp = require("../controllers/user_profile");

router.get("/profile", userController.userProfile);
router.get("/signin", userController.signin);
router.get("/signup", userController.signup);
router.get("/register", userController.register);
router.get("/logout", userController.logout);
router.post("/create", userController.create);
router.post("/createSession", userController.createSession);
module.exports = router;
