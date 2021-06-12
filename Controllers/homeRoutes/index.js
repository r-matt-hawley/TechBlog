const router = require("express").Router();
const { Post, User } = require("../../Models");
const withAuth = require("../../Utils/auth");

router.get('/', async (req, res) => {
  try {
    // Get all Posts and JOIN with user data
    const postData = await Post.findAll({
      // raw: true,
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({plain:true}));
    // Pass serialized data and session flag into template
    
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {

    // Find the logged in user based on the session ID
    const userData = await User.findByPk(1,{//req.session.user_id, {
      raw: true,
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    res.render("dashboard", {
      user:userData
    });
  } catch (err) {
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

module.exports = router;
