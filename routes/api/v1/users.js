const express = require("express");
const router = express.Router();

const usersAPI = require("../../../controllers/api/v1/users_api");

router.post("/createSession", usersAPI.createSession);

module.exports = router;
