const { describe, it, expect } = global;
const { fakePostModel } = require('../__mocks__/fake.post.model');
const { PostRepository } = require('./post.repository');
const { fakePosts } = require('../__mocks__/fake.post');

const postRepository = new PostRepository(fakePostModel);

describe('PostRepository Test', () => {
  describe('getAll', () => {
    it('should return all posts', async () => {
      const posts = await postRepository.getAll();
      expect(posts).toEqual(fakePosts);
    });
    it('should return an empty array if there are no posts', async () => {
      jest.spyOn(fakePostModel, 'find').mockImplementationOnce(() => Promise.resolve([]));
      const posts = await postRepository.getAll();
      expect(posts).toEqual([]);
    });
    it('should call PostModel.find method', () => {
      jest.spyOn(fakePostModel, 'find');
      postRepository.getAll();
      expect(fakePostModel.find).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return a post', async () => {
      const post = await postRepository.getById(fakePosts[0]);
      expect(post).toEqual(fakePosts[0]);
    });
    it('should call PostModel.findById method', () => {
      jest.spyOn(fakePostModel, 'findById');
      postRepository.getById(fakePosts[0]);
      expect(fakePostModel.findById).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a post', async () => {
      const post = await postRepository.create(fakePosts[0]);
      expect(post).toEqual(fakePosts[0]);
    });
    it('should call PostModel.create method', () => {
      jest.spyOn(fakePostModel, 'create');
      postRepository.create(fakePosts[0]);
      expect(fakePostModel.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const post = await postRepository.update(fakePosts[0]);
      expect(post).toEqual(fakePosts[0]);
    });
    it('should call PostModel.findByIdAndUpdate method', () => {
      jest.spyOn(fakePostModel, 'findByIdAndUpdate');
      postRepository.update(fakePosts[0]);
      expect(fakePostModel.findByIdAndUpdate).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should delete a post', async () => {
      const post = await postRepository.delete(fakePosts[0]);
      expect(post).toEqual(fakePosts[0]);
    });
    it('should call PostModel.findByIdAndDelete method', () => {
      jest.spyOn(fakePostModel, 'findByIdAndDelete');
      postRepository.delete(fakePosts[0]);
      expect(fakePostModel.findByIdAndDelete).toHaveBeenCalled();
    });
  });
});