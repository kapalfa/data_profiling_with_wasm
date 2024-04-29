const express = require("express");
const ensureAuth = require("../config/ensureAuth");

const router = express.Router();

router.get("/", ensureAuth, function (req, res) {
  res.render("main");
});

module.exports = router;
