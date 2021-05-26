const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res, next) => {
  res.send({ message: "hello" });
});

router.post("/", passport.authenticate("local"), (req, res, next) => {
  console.log("sss");
  res.send({ message: req.body.username });
});

module.exports = router;
