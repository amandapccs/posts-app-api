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
    })
    // it("should send an error message in catch sentence", async () => {
    //   jest.spyOn(fakePostRepository, "getById").mockRejectedValueOnce("Error");
    //   const post = await postService.getById(fakeId);
    //   expect(post).toEqual({
    //     promiseError: { error: "Error", message: "Promise Error" },
    //   });
    // });
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
    // it("should send an error message in catch sentence", async () => {
    //   jest.spyOn(fakePostRepository, "update").mockRejectedValueOnce("Error");
    //   const post = await postService.update(fakeId, fakePosts[0]);
    //   expect(post).toEqual({
    //     promiseError: { error: "Error", message: "Promise Error" },
    //   });
    // });
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
    // it("should send an error message in catch sentence", async () => {
    //   jest.spyOn(fakePostRepository, "delete").mockRejectedValueOnce("Error");
    //   const post = await postService.delete(fakeId);
    //   expect(post).toEqual({
    //     promiseError: { error: "Error", message: "Promise Error" },
    //   });
    // });
  });
});
