const { mockResponse, mockRequest } = require("./../__mocks__/fake.post.routes");
const { fakePostService } = require("./../__mocks__/fake.post.service");
const { PostController } = require("././post.controller");
const { describe, it, expect } = global;
const { fakeId, fakePosts } = require("./../__mocks__/fake.post");

const postController = new PostController(fakePostService);
const req = mockRequest();
const res = mockResponse();
const mockInvalidIdResponse = { validationError: { message: "Post not found", status: 404 } }

describe("PostController", () => {
  describe("getAll", () => {
    it("should return all posts", async () => {
      await postController.getAll(req, res);
      expect(res.json).toHaveBeenCalledWith(fakePosts);
    });
    it("should call PostService.getAll method", () => {
      jest.spyOn(fakePostService, "getAll");
      postController.getAll(req, res);
      expect(fakePostService.getAll).toHaveBeenCalled();
    });
    it("should return status code 200", async () => {
      await postController.getAll(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
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
    it("should return status code 200", async () => {
      await postController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should return status code 404 if the post does not exist", async () => {
      req.params.id = "wrongId";
      jest.spyOn(fakePostService, 'getById').mockImplementationOnce(() => Promise.resolve(mockInvalidIdResponse));
      await postController.getById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
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
    it("should return status code 201", async () => {
      await postController.create(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
    it("shouldn't create a post if the body is not in JSON format", async () => {
      req.apiGateway.event.body = "Invalid JSON";
      await postController.create(req, res);
      expect(res.json).toHaveBeenCalledWith("Invalid JSON");
      expect(res.status).toHaveBeenCalledWith(400);
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
    it("should return status code 200", async () => {
      await postController.update(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("shouldn't update a post if the body is not in JSON format", async () => {
      req.apiGateway.event.body = "Invalid JSON";
      await postController.update(req, res);
      expect(res.json).toHaveBeenCalledWith("Invalid JSON");
      expect(res.status).toHaveBeenCalledWith(400);
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
    it("should return status code 200", async () => {
      await postController.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should return status code 404 if the post does not exist", async () => {
      req.params.id = "wrongId";
      jest.spyOn(fakePostService, 'delete').mockImplementationOnce(() => Promise.resolve(mockInvalidIdResponse));
      await postController.delete(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});
