const express = require("express");
var router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");

router.get("/", authenticateUser(), (req, res) => {
  res.send(req.user);
});
module.exports = router;
