const express = require('express');
var router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

router.get('/', isLoggedIn(), (req, res, next) => {
  res.send(req.user);
});
module.exports = router;
