import { Post, PostWithDates } from "../interfaces";
import { PostModel } from "../models/post.model";

export class PostRepository {
  public model: typeof PostModel;
  constructor(model: typeof PostModel) {
    this.model = model;
  }

  async getAll(): Promise<PostWithDates[]> {
    const posts = await this.model.find();
    return posts;
  }

  async getById(id: string): Promise<PostWithDates> {
    const post = await this.model.findById(id);
    if (post === null) {
      return {} as PostWithDates;
    };
    return post;
  }

  async create(post: Post) {
    return this.model.create(post);
  }

  async update(id: string, post: Post): Promise<PostWithDates> {
    const updatedPost = await this.model.findByIdAndUpdate(id, {
      $push: {
        title: post.title,
        content: post.content,
        updatedAt: new Date(),
      },
    }, { new: true });
    if (updatedPost === null) {
      return {} as PostWithDates;
    }
    return updatedPost;
  }

  async delete(id: string): Promise<PostWithDates> {
    const deletePost = await this.model.findByIdAndDelete(id);
    if (deletePost === null) {
      return {} as PostWithDates;
    }
    return deletePost;
  }
}