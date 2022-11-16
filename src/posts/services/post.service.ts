import { IRepository, Post, PostWithDates } from '../interfaces';
const { Types } = require('mongoose');
const { invalidPostId, promisePostError, validatePost } = require('./../middlewares/post.validation');

export class PostService {
  public repository: IRepository;
  constructor(repository: IRepository) {
    this.repository = repository;
  }

  async getAll() {
    try {
      const posts = await this.repository.getAll();
      return posts;
    } catch (error) {
      return promisePostError(error);
    }
  }

  async getById(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      return invalidPostId(id);
    }

    try {
      const post = await this.repository.getById(id);
      return post;
    } catch (error) {
      return promisePostError(error);
    }
  }

  async create(post: Post) {
    try {
      const validatedPost = validatePost(post);
      if (validatedPost) return validatedPost;
  
      const createdPost = await this.repository.create(post);
      return createdPost;
    } catch (error) {
      return promisePostError(error);
    }
  }

  async update(id: string, post: Post) {
    if (!Types.ObjectId.isValid(id)) {
      return invalidPostId(id);
    }
    
    try {
      const validatedPost = validatePost(post);
      if (validatedPost) return validatedPost;

      const updatedPost = await this.repository.update(id, post);
      return updatedPost;
    } catch (error) {
      return promisePostError(error);
    }
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      return invalidPostId(id);
    }

    try {
      const deletedPost = await this.repository.delete(id);
      return deletedPost;
    } catch (error) {
      return promisePostError(error);
    }
  }
}
