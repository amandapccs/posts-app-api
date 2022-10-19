const { Types } = require('mongoose');

class PostService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    try {
      const posts = await this.repository.getAll();
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID');
    }

    try {
      const post = await this.repository.getById(id);
      return post;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(post) {
    try {
      const createdPost = await this.repository.create(post);
      return createdPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, post) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID');
    }

    // fazer validação do post aqui com o dto

    try {
      const updatedPost = await this.repository.update(id, post);
      return updatedPost;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID');
    }

    try {
      const deletedPost = await this.repository.delete(id);
      return deletedPost;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = { PostService };