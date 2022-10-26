const { Types } = require('mongoose');
const { invalidPostId, promisePostError, validatePost } = require('../middlewares/post.validation');

class PostService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    try {
      const posts = await this.repository.getAll();
      return posts;
    } catch (error) {
      promisePostError(error);
    }
  }

  async getById(id) {
    if (!Types.ObjectId.isValid(id)) {
      return invalidPostId(id);
    }

    try {
      const post = await this.repository.getById(id);
      return post;
    } catch (error) {
      promisePostError(error);
    }
  }

  async create(post) {
    try {
      const validatedPost = validatePost(post);
      if (validatedPost) return validatedPost;
  
      const createdPost = await this.repository.create(post);
      return createdPost;
    } catch (error) {
      promisePostError(error);
    }
  }

  async update(id, post) {
    if (!Types.ObjectId.isValid(id)) {
      return invalidPostId(id);
    }
    
    try {
      const validatedPost = validatePost(post);
      if (validatedPost) return validatedPost;

      const updatedPost = await this.repository.update(id, post);
      return updatedPost;
    } catch (error) {
      promisePostError(error);
    }
  }

  async delete(id) {
    if (!Types.ObjectId.isValid(id)) {
      return invalidPostId(id);
    }

    try {
      const deletedPost = await this.repository.delete(id);
      return deletedPost;
    } catch (error) {
      promisePostError(error);
    }
  }
}

module.exports = { PostService };