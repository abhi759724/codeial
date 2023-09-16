const express = require("express");

const router = express.Router();

const user = require("../controllers/user_profile");

router.get("/profile", user);

console.log("user router exported");

module.exports = router;
