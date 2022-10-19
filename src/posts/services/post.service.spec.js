const { fakePosts, updatedPost } = require("../__mocks__/fake.post");
const { fakePostRepository } = require("../__mocks__/fake.post.repository");
const { PostService } = require("./post.service");
const { describe, it, expect } = global;

const postService = new PostService(fakePostRepository);

describe("PostService", () => {
  describe("getAll", () => {
    it("should return all posts", async () => {
      jest.spyOn(fakePostRepository, "getAll").mockResolvedValueOnce(fakePosts);
      const posts = await postService.getAll();
      expect(posts).toEqual(fakePosts);
    });
    it("should return an empty array if there is no posts", async () => {
      jest.spyOn(fakePostRepository, "getAll").mockResolvedValueOnce([]);
      const posts = await postService.getAll();
      expect(posts).toEqual([]);
    });
    it("should call PostRepository.getAll method", () => {
      jest.spyOn(fakePostRepository, "getAll");
      postService.getAll();
      expect(fakePostRepository.getAll).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return a post", async () => {
      jest.spyOn(fakePostRepository, "getById").mockResolvedValueOnce(fakePosts[0]);
      const post = await postService.getById(fakeId);
      expect(post).toEqual(fakePosts[0]);
    });
    it("should call PostRepository.getById method", () => {
      jest.spyOn(fakePostRepository, "getById");
      postService.getById(fakeId);
      expect(fakePostRepository.getById).toHaveBeenCalled();
    });
    it("should send an error message in catch sentence", async () => {
      jest.spyOn(fakePostRepository, "getById").mockRejectedValueOnce("Error");
      const post = await postService.getById(fakeId);
      expect(post).toEqual({
        promiseError: { error: "Error", message: "Promise Error" },
      });
    });
  });

  describe("create", () => {
    it("should create a post", async () => {
      jest.spyOn(fakePostRepository, "create").mockResolvedValueOnce(fakePosts[0]);
      const post = await postService.create(fakePosts[0]);
      expect(post).toEqual(fakePosts[0]);
    });
    it("should call PostRepository.create method", () => {
      jest.spyOn(fakePostRepository, "create");
      postService.create(fakePosts[0]);
      expect(fakePostRepository.create).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update a post", async () => {
      jest.spyOn(fakePostRepository, "update").mockResolvedValueOnce(fakePosts[0]);
      const post = await postService.update(fakeId, fakePosts[0]);
      expect(post).toEqual(fakePosts[0]);
    });
    it("should call PostRepository.update method", () => {
      jest.spyOn(fakePostRepository, "update");
      postService.update(fakeId, fakePosts[0]);
      expect(fakePostRepository.update).toHaveBeenCalled();
    });
    it("should send an error message in catch sentence", async () => {
      jest.spyOn(fakePostRepository, "update").mockRejectedValueOnce("Error");
      const post = await postService.update(fakeId, fakePosts[0]);
      expect(post).toEqual({
        promiseError: { error: "Error", message: "Promise Error" },
      });
    });
  });

  describe("delete", () => {
    it("should delete a post", async () => {
      jest.spyOn(fakePostRepository, "delete").mockResolvedValueOnce(fakePosts[0]);
      const post = await postService.delete(fakeId);
      expect(post).toEqual(fakePosts[0]);
    });
    it("should call PostRepository.delete method", () => {
      jest.spyOn(fakePostRepository, "delete");
      postService.delete(fakeId);
      expect(fakePostRepository.delete).toHaveBeenCalled();
    });
    it("should send an error message in catch sentence", async () => {
      jest.spyOn(fakePostRepository, "delete").mockRejectedValueOnce("Error");
      const post = await postService.delete(fakeId);
      expect(post).toEqual({
        promiseError: { error: "Error", message: "Promise Error" },
      });
    });
  });
});
