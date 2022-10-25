const { mockResponse, mockRequest } = require("../__mocks__/fake.post.routes");
const { fakePostService } = require("../__mocks__/fake.post.service");
const { PostController } = require("./post.controller");
const { describe, it, expect } = global;
const { fakeId, fakePosts } = require("../__mocks__/fake.post");

const postController = new PostController(fakePostService);
const req = mockRequest();
const res = mockResponse();

describe("PostController", () => {
  describe("getAll", () => {
    it("should return all posts", async () => {
      await postController.getAll(req, res);
      expect(res.json).toHaveBeenCalledWith(fakePosts);
      // expect(res.status).toBe(200);
    });
    it("should call PostService.getAll method", () => {
      jest.spyOn(fakePostService, "getAll");
      postController.getAll(req, res);
      expect(fakePostService.getAll).toHaveBeenCalled();
    });
  });

  describe("getById", () => {
    it("should return a post", async () => {
      req.params.id = fakeId;
      await postController.getById(req, res);
      expect(res.json).toHaveBeenCalledWith(fakePosts[0]);
    });
    it("should call PostService.getById method", async () => {
      jest.spyOn(fakePostService, "getById");
      await postController.getById(req, res);
      expect(fakePostService.getById).toHaveBeenCalled();
    });
  });

  describe("create", () => {
    it("should create a post", async () => {
      req.body = fakePosts[0];
      await postController.create(req, res);
      expect(res.json).toHaveBeenCalledWith(fakePosts[0]);
    });
    it("should call PostService.create method", async () => {
      jest.spyOn(fakePostService, "create");
      req.apiGateway.event.body = JSON.stringify(fakePosts[0]);
      await postController.create(req, res);
      expect(fakePostService.create).toHaveBeenCalled();
    });
  });

  describe("update", () => {
    it("should update a post", async () => {
      req.params.id = fakeId;
      req.apiGateway.event.body = JSON.stringify(fakePosts[0]);
      await postController.update(req, res);
      expect(res.json).toHaveBeenCalledWith(fakePosts[0]);
    });
    it("should call PostService.update method", async () => {
      jest.spyOn(fakePostService, "update");
      await postController.update(req, res);
      expect(fakePostService.update).toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("should delete a post", async () => {
      req.params.id = fakeId;
      await postController.delete(req, res);
      expect(res.json).toHaveBeenCalledWith(fakePosts[0]);
    });
    it("should call PostService.delete method", () => {
      jest.spyOn(fakePostService, "delete");
      postController.delete(req, res);
      expect(fakePostService.delete).toHaveBeenCalled();
    });
  });
});
