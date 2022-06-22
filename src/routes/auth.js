const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("you just GET /");
});

module.exports = router;

