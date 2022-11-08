const express = require("express");

const { signupM } = require("../controller/authMongoos");

const router = express.Router();

router.post("/signup", signupM);
// router.post("/login", login);

module.exports = router;
