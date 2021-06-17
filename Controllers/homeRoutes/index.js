const router = require("express").Router();
const { Post, User } = require("../../Models");
const withAuth = require("../../Utils/auth");

router.get('/', async (req, res) => {
  try {
    // Get all Posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {

    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });


    // Get all Posts and JOIN with user data
    const postData = await Post.findAll({
      where: {
        user_id: userData.id
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    const user_ids = posts.map((post) => post.user_id);
    // Pass serialized data and session flag into template
    // res.render('homepage', {
    //   posts,
    //   logged_in: req.session.logged_in
    // });


    console.log("\n\nSession:\n", req.session, "\n\n");

    res.render("dashboard", {
      user_id: user_ids,
      posts: posts,
      logged_in_user: req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log("Error in /dashboard");
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  try {
    res.render("login", {

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  //This route used when rendering a post as a webpage
  try {
    const postData = await Post.findOne({ raw:true, where: { id: req.params.id } });

    if (!postData) {
      console.log("/post/:id:\nPost id not found:", req.params.id);
      res
        .status(400)
        .json({ message: 'Post not found, please try again' });
      return;
    }

    // post = postData.map(data => data.get({ plain: true }));

    res.render('showPost', { ...postData, logged_in: req.session.logged_in });

  } catch (error) {
    console.log("\n\n/api/posts/:id error:\n", error, "\n\n");
    res.status(400).json(error);
  }
});

module.exports = router;
