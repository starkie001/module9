const express = require('express');
const router = express.Router();
const Like = require('../models/Like');

// CREATE or UPDATE like (upsert)
router.post('/', async (req, res) => {
  const { postId, userId, likeStatus } = req.body;

  try {
    let like = await Like.findOne({ postId, userId });

    if (like) {
      like.likeStatus = likeStatus;
      await like.save();
    } else {
      like = new Like({ postId, userId, likeStatus });
      await like.save();
    }

    res.status(200).json(like);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all likes for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const likes = await Like.find({ postId: req.params.postId, likeStatus: true });
    res.json({ likeCount: likes.length, likes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ all likes by a user
router.get('/user/:userId', async (req, res) => {
  try {
    const likes = await Like.find({ userId: req.params.userId });
    res.json(likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE like
router.delete('/:id', async (req, res) => {
  try {
    await Like.findByIdAndDelete(req.params.id);
    res.json({ message: 'Like removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
