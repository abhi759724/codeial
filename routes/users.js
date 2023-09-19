const express = require("express");
const router = express.Router();

const userController = require("../controllers/user_controller");
// const signIn = require("../controllers/user_profile");
// const signUp = require("../controllers/user_profile");

router.get("/profile", userController.userProfile);
router.get("/signin", userController.signin);
router.get("/signup", userController.signup);
router.post("/create", userController.create);
// router.post("createSession", userController.signin);
module.exports = router;
