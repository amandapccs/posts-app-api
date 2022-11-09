const { fakePosts, fakeId } = require("./../__mocks__/fake.post");
const { fakePostRepository } = require("./../__mocks__/fake.post.repository");
const { PostService } = require("././post.service");
const { describe, it, expect } = global;

const postService = new PostService(fakePostRepository);

describe("PostService", () => {
  describe("getAll", () => {
    it("should return all posts", async () => {
      const posts = await postService.getAll();
      expect(posts).toEqual(fakePosts);
    });
    it("should return an empty array if there is no posts", async () => {
      jest.spyOn(fakePostRepository, "getAll").mockResolvedValueOnce([]);
      const posts = await postService.getAll();
      expect(posts).toEqual([]);
    });
    it("it should return an array", async () => {
      const posts = await postService.getAll();
      expect(Array.isArray(posts)).toBe(true);
    })
    it("should call PostRepository.getAll method", () => {
      jest.spyOn(fakePostRepository, "getAll");
      postService.getAll();
      expect(fakePostRepository.getAll).toHaveBeenCalled();
    });
    it("should send an error message in catch sentence", async () => {
      jest.spyOn(fakePostRepository, "getAll").mockImplementationOnce(() => { throw new Error("Error") });
      const post = await postService.getAll();
      console.log('---->', post);
      expect(post).toEqual({
        promiseError: { message: "Error", status: 500 },
      });
    });
  });

  describe("getById", () => {
    it("should return a post", async () => {
      const post = await postService.getById(fakeId);
      expect(post).toEqual(fakePosts[0]);
    });
    it("should call PostRepository.getById method", () => {
      jest.spyOn(fakePostRepository, "getById");
      postService.getById(fakeId);
      expect(fakePostRepository.getById).toHaveBeenCalled();
    });
    it("should return an object with the correct keys", async () => {
      const post = await postService.getById(fakeId);
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("insertedAt");
      expect(post).toHaveProperty("updatedAt");
    });
    it("should not find a post if the id does not exist", async () => {
      const post = await postService.getById('wrongId');
      expect(post).toEqual({ validationError: {
      message: `Post with id wrongId does not exist`,
      status: 404,
    },});
    });
    it("should send an error message in catch sentence", async () => {
      jest.spyOn(fakePostRepository, "getById").mockImplementationOnce(() => { throw new Error("Error") });
      const post = await postService.getById(fakeId);
      expect(post).toEqual({
        promiseError: { message: "Error", status: 500 },
      });
    });
  });

  describe("create", () => {
    it("should create a post", async () => {
      const post = await postService.create(fakePosts[0]);
      expect(post).toEqual(fakePosts[0]);
    });
    it("should return an object with the correct keys", async () => {
      const post = await postService.getById(fakeId);
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("insertedAt");
      expect(post).toHaveProperty("updatedAt");
    });
    it("should call PostRepository.create method", () => {
      jest.spyOn(fakePostRepository, "create");
      postService.create(fakePosts[0]);
      expect(fakePostRepository.create).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update a post", async () => {
      const post = await postService.update(fakeId, fakePosts[0]);
      expect(post).toEqual(fakePosts[0]);
    });
    it("should return an object with the correct keys", async () => {
      const post = await postService.getById(fakeId);
      expect(post).toHaveProperty("id");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("content");
      expect(post).toHaveProperty("insertedAt");
      expect(post).toHaveProperty("updatedAt");
    });
    it("should call PostRepository.update method", () => {
      jest.spyOn(fakePostRepository, "update");
      postService.update(fakeId, fakePosts[0]);
      expect(fakePostRepository.update).toHaveBeenCalled();
    });
    it("should not find a post if the id does not exist", async () => {
      const post = await postService.update('wrongId');
      expect(post).toEqual({ validationError: {
      message: `Post with id wrongId does not exist`,
      status: 404,
        },
      });
    });
    it("should send an error message in catch sentence", async () => {
      jest.spyOn(fakePostRepository, "update").mockImplementationOnce(() => { throw new Error("Error") });
      const post = await postService.update(1, fakePosts[0]);
      console.log('---->', post);
      expect(post).toEqual({
        promiseError: { message: "Error", status: 500 },
      });
    });
  });

  describe("delete", () => {
    it("should delete a post", async () => {
      const post = await postService.delete(fakeId);
      expect(post).toEqual(fakePosts[0]);
    });
    it("should call PostRepository.delete method", () => {
      jest.spyOn(fakePostRepository, "delete");
      postService.delete(fakeId);
      expect(fakePostRepository.delete).toHaveBeenCalled();
    });
    it("should not find a post if the id does not exist", async () => {
      const post = await postService.delete('wrongId');
      expect(post).toEqual({ validationError: {
      message: `Post with id wrongId does not exist`,
      status: 404,
        },
      });
    });
    it("should send an error message in catch sentence", async () => {
      jest.spyOn(fakePostRepository, "delete").mockImplementationOnce(() => { throw new Error("Error") });
      const post = await postService.delete(1);
      console.log('---->', post);
      expect(post).toEqual({
        promiseError: { message: "Error", status: 500 },
      });
    });
  });
});
