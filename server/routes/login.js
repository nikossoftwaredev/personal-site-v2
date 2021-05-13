const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.send({ message: 'hello' });
});

router.post('/', passport.authenticate('local'), (req, res) => {
  res.send({ message: req.body.username });
});

module.exports = router;
