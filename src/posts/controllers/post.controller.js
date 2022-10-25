const { StatusCode } = require("../../utils/status.code");
const { isJson } = require("../../utils/json.validator");

class PostController {
  constructor(service) {
    this.service = service;
  }

  async getAll(req, res) {
    try {
      const posts = await this.service.getAll();
      res.status(StatusCode.OK).json(posts);
    } catch (error) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const post = await this.service.getById(id);
      res.status(StatusCode.OK).json(post);
    } catch (error) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  async create(req, res) {
    try {
      const rawBody = req.apiGateway.event.body;

      if (!isJson(rawBody)) {
        res.status(StatusCode.BAD_REQUEST).json("Invalid JSON");
        return;
      }

      const post = await this.service.create(JSON.parse(rawBody));
      res.status(StatusCode.CREATED).json(post);

    } catch (error) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const rawBody = req.apiGateway.event.body;

      if (!isJson(rawBody)) {
        res.status(StatusCode.BAD_REQUEST).json("Invalid JSON");
        return;
      }
      const post = await this.service.update(id, JSON.parse(rawBody));
      res.status(StatusCode.OK).json(post);
    } catch (error) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const post = await this.service.delete(id);
      res.status(StatusCode.OK).json(post);
    } catch (error) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

module.exports = { PostController };
