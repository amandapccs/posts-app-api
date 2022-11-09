const { StatusCode } = require("./../../utils/status.code");
const { isJson } = require("./../../utils/json.validator");
const { PostDto } = require("../dtos/post.dto");

class PostController {
  constructor(service) {
    this.service = service;
  }

  async getAll(_req, res) {
    const posts = await this.service.getAll();
    return res.status(StatusCode.OK).json(posts);
  }

  async getById(req, res) {
    const { id } = req.params;
    const post = await this.service.getById(id);
    if ('validationError' in post) return res.status(post.validationError.status).json({ message: post.validationError.message });
    return res.status(StatusCode.OK).json(post);
  }

  async create(req, res) {
    const rawBody = req.apiGateway.event.body;
    
    if (!isJson(rawBody)) {
      res.status(StatusCode.BAD_REQUEST).json("Invalid JSON");
      return;
    }
    
    const postDto = new PostDto(rawBody);
    const post = await this.service.create(postDto);
    if ('validationError' in post) return res.status(post.validationError.status).json({ message: post.validationError.message });
    
    return res.status(StatusCode.CREATED).json(post);
  }

  async update(req, res) {
    const { id } = req.params;
    const rawBody = req.apiGateway.event.body;

    if (!isJson(rawBody)) {
      res.status(StatusCode.BAD_REQUEST).json("Invalid JSON");
      return;
    }
    const postDto = new PostDto(rawBody);
    const post = await this.service.update(id, postDto);
    if ('validationError' in post) return res.status(post.validationError.status).json({ message: post.validationError.message });

    return res.status(StatusCode.OK).json(post);
  }

  async delete(req, res) {
    const { id } = req.params;
    const post = await this.service.delete(id);

    if ('validationError' in post) return res.status(post.validationError.status).json({ message: post.validationError.message });
      
    return res.status(StatusCode.OK).json(post);
  }
}

module.exports = { PostController };
