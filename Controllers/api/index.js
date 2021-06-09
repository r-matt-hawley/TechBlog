const router = require("express").Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");

router.get("/", async (req, res) => {
  try {
    res.json({message:"/api served successfully."})
  } catch (err) {
    res.status(500).json(err);
  }
});

router.use('/users', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;