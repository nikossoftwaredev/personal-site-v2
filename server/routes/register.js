const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

router.get("/", (req, res) => {
  res.send({ message: "hello" });
});

router.post("/", async (req, res) => {
  try {
    // Check if user already exists
    await User.find(
      { $or: [{ username: req.body.username }, { mail: req.body.mail }] },
      (err, docs) => {
        if (!err) {
          console.log(docs.length);
        }
      }
    );
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = { ...req.body, password: { bcrypt: hashedPassword } };

    User.create(user, (err, docs) => {
      if (err.code === 11000) return res.status(409).send(err);
      if (err) return res.status(424).send(err);
      res.status(200).send(user);
    });
  } catch {
    res.redirect("/register");
  }
});

module.exports = router;
