const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  req.logout();
  res.send({ message: 'logged out' });
});

module.exports = router;
