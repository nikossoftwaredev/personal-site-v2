const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

router.get("/", (req, res, next) => {
  res.send({ message: "hello" });
});

router.post("/", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = { ...req.body, password: { bcrypt: hashedPassword } };

    User.create(user, (err) => {
      if (err) return next(err);
      res.status(300).send(user);
    });
  } catch {
    res.redirect("/register");
  }
});

module.exports = router;
