class PostRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    const posts = await this.model.find();
    return posts;
  }

  async getById(id) {
    const post = await this.model.findById(id);
    if (post === null) {
      return {};
    };
    return post;
  }

  async create(post) {
    return this.model.create(post);
  }

  async update(id, post) {
    const updatedPost = await this.model.findByIdAndUpdate(id, {
      $push: {
        title: post.title,
        content: post.content,
        updatedAt: new Date(),
      },
    }, { new: true });
    if (updatedPost === null) {
      return {};
    }
    return updatedPost;
  }

  async delete(id) {
    const deletePost = await this.model.findByIdAndDelete(id);
    if (deletePost === null) {
      return {};
    }
    return deletePost;
  }
}

module.exports = { PostRepository };