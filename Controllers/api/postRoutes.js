const router = require('express').Router();
const { Post } = require('../../Models');
const withAuth = require('../../Utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  //This route used when returning a post as a JSON
  try {
    const postData = await Post.findOne({ raw:true, where: { id: req.params.id } });

    if (!postData) {
      console.log("/api/posts/:id:\nPost id not found:", req.params.id);
      res
        .status(400)
        .json({ message: 'Post not found, please try again' });
      return;
    }

    // post = postData.map(data => data.get({ plain: true }));

    res.status(200).json(...postData );

  } catch (error) {
    console.log("\n\n/api/posts/:id error:\n", error, "\n\n");
    res.status(400).json(error);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: 'No Post found with this id!' });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
