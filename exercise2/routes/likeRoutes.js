const express = require('express');
const router = express.Router();
const { likeController } = require('../controllers');

// CRUD operations
router.post('/', likeController.likeOrUpdate);
router.get('/post/:postId', likeController.getLikesByPost);
router.get('/user/:userId', likeController.getLikesByUser);
router.delete('/:id', likeController.deleteLike);

module.exports = router;
