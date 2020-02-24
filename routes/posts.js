const router = require("express").Router();
const Post = require("../models/Post");

/* Here we'll write the routes for the posts */

// Retrieve all of the posts
router.get("/posts", (req, res) => {
  Post.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.get("/posts/:id", (req, res) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

router.post("/posts", (req, res) => {
  const { title, type, content } = req.body;
  Post.create({
    title: title,
    type: type,
    content: content,
    upvote_count: 0
    //   author: req.user._id
  })
    .then(postDocument => {
      res.json(postDocument);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message
      });
    });
});

// Update Upvotes
router.post("/posts/:id/upvote", (req, res) => {
  const postId = req.params.id;

  Post.findByIdAndUpdate(postId, { $inc: { upvote_count: 1 } }, { new: true })
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

// Delete Upvotes
router.delete("/posts/:id/upvote", (req, res) => {
  const postId = req.params.id;

  Post.findByIdAndUpdate(postId, { $inc: { upvote_count: -1 } }, { new: true })
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
