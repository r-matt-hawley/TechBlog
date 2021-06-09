const router = require("express").Router();
const { Post, User } = require("../models");
// const withAuth = require("../utils/auth");

router.get('/', async (req, res) => {
  try {
    // Get all Posts and JOIN with user data
    const PostData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const Posts = PostData.map((Post) => Post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      Posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async(req, res) => {
    try{
        res.render("dashboard",{

        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/login", async(req, res) => {
    try{
        res.render("login",{

        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
