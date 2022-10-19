const { PostRepository } = require('../repositories/post.repository');
const { PostModel } = require('../models/post.model');
const { PostService } = require('../services/post.service');
const { PostController } = require('../controllers/post.controller');

function postFactory() {
  const postRepository = new PostRepository(PostModel);
  const postService = new PostService(postRepository);
  const postController = new PostController(postService);

  return postController;
}

const post = postFactory();

module.exports = { post };
