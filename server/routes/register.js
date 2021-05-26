const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

router.get("/", (req, res) => {
  res.send({ message: "hello" });
});

router.post("/", async (req, res, next) => {
  try {
    // Check if user already exists
    await User.find({ username: req.body.username }, async (err, docs) => {
      if (docs.length) {
        return next({ message: "User already exists" });
      } else {
        const hashedPassword = await bcrypt.hash(
          req.body.password,
          SALT_ROUNDS
        );
        const user = { ...req.body, password: { bcrypt: hashedPassword } };

        User.create(user, (err, docs) => {
          if (err) return next(err);
          res.status(200).send(user);
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
