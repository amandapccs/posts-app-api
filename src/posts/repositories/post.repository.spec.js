const { describe, it, expect } = global;
const { fakePostModel } = require('./../__mocks__/fake.post.model');
const { PostRepository } = require('././post.repository');
const { fakePosts, fakeId } = require('./../__mocks__/fake.post');

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
    it('should return an array', async () => {
      const posts = await postRepository.getAll();
      expect(Array.isArray(posts)).toBe(true);
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
    it("should return an object with the correct keys", async () => {
      const post = await postRepository.getById(fakePosts[0]);
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("insertedAt");
      expect(post).toHaveProperty("updatedAt");
    })
    it('should call PostModel.findById method', () => {
      jest.spyOn(fakePostModel, 'findById');
      postRepository.getById(fakePosts[0]);
      expect(fakePostModel.findById).toHaveBeenCalled();
    });
    it('should return an empty object if the id does not exist', async () => {
      jest.spyOn(fakePostModel, 'findById').mockImplementationOnce(() => Promise.resolve(null));
      const post = await postRepository.getById('fakeId');
      expect(post).toEqual({});
    });
  });

  describe('create', () => {
    it('should create a post', async () => {
      const post = await postRepository.create(fakePosts[0]);
      expect(post).toEqual(fakePosts[0]);
    });
    it('should call PostModel.create method', async () => {
      jest.spyOn(fakePostModel, 'create');
      postRepository.create(fakePosts[0]);
      expect(fakePostModel.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a post', async () => {
      const post = await postRepository.update(fakeId, fakePosts[0].content);
      expect(post).toEqual(fakePosts[0]);
    });
    it('should call PostModel.findByIdAndUpdate method', () => {
      jest.spyOn(fakePostModel, 'findByIdAndUpdate');
      postRepository.update(fakeId, fakePosts[0].content);
      expect(fakePostModel.findByIdAndUpdate).toHaveBeenCalled();
    });
    it('should return an empty object if it cannot update', async () => {
      jest.spyOn(fakePostModel, 'findByIdAndUpdate').mockImplementationOnce(() => Promise.resolve(null));
      const post = await postRepository.update('invalidId', fakePosts[0].content);
      expect(post).toEqual({});
    });
  });

  describe('delete', () => {
    it('should delete a post', async () => {
      const post = await postRepository.delete(fakeId);
      expect(post).toBe(undefined);
    });
    it('should call PostModel.findByIdAndDelete method', () => {
      jest.spyOn(fakePostModel, 'findByIdAndDelete');
      postRepository.delete(fakeId);
      expect(fakePostModel.findByIdAndDelete).toHaveBeenCalled();
    });
    it('should return an empty object if it cannot delete', async () => {
      jest.spyOn(fakePostModel, 'findByIdAndDelete').mockImplementationOnce(() => Promise.resolve(null));
      const post = await postRepository.delete('invalidId');
      expect(post).toEqual({});
    });
  });
});