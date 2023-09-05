const express = require('express');
const {
  getPosts,
  createPost,
  updatePost,
  getPost,
  deletePost,
} = require('../controllers/posts');
const router = express.Router();

router.route('/').get(getPosts).post(createPost);

router.route('/:id').get(getPost).put(updatePost).delete(deletePost);

module.exports = router;
