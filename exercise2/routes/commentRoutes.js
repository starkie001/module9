const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// CREATE comment
router.post('/', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ all comments for a post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate('userId', 'firstName lastName');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ single comment
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('userId', 'firstName lastName');
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE comment
router.put('/:id', async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE comment
router.delete('/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
