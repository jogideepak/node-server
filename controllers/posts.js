const Post = require('../models/Post');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/**
 * @desc        Get all posts from DB
 * @route       GET     /api/v1/posts
 * @access      Public
 */
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    success: true,
    data: posts,
  });
});

/**
 * @desc        Create new post
 * @route       POST    /api/v1/posts
 * @access      Private
 */
exports.createPost = asyncHandler(async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(201).json({
    success: true,
    data: post,
  });
});

/**
 * @desc        Get a single post via ID
 * @route       GET     /api/v1/posts/:id
 * @access      Private
 */
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(
        `There are no resources matching the id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

/**
 * @desc        Update an existing post via ID
 * @route       PUT     /api/v1/posts/:id
 * @access      Private
 */
exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!post) {
    return next(
      new ErrorResponse(`No resource matching ID of ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    success: true,
    data: post,
  });
});

/**
 * @desc        Delete an existing post via ID
 * @route       DELETE    /api/v1/posts/:id
 * @access      Private
 */
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No resource matching id of ${req.params.id}`, 404)
    );
  }
  res.status(300).json({
    success: true,
    data: {},
  });
});
