const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
      res.json({message:"/api served successfully."})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;