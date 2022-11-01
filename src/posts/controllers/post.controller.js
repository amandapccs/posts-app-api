const { StatusCode } = require("./../../utils/status.code");
const { isJson } = require("./../../utils/json.validator");

class PostController {
  constructor(service) {
    this.service = service;
  }

  async getAll(_req, res) {
    const posts = await this.service.getAll();
    if ('validationError' in posts) return res.status(posts.validationError.status).json({ message: posts.validationError.message });
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
    console.log('rawBody ---->',rawBody);
    const isBodyJson = isJson(rawBody);
    console.log('esse é o req.body ---->', req);

    const body = isBodyJson ? JSON.parse(rawBody) : rawBody;
    console.log('body ------>', body);

    const post = await this.service.create(body);
    console.log('post ------>', post);
    if ('validationError' in post) return res.status(post.validationError.status).json({ message: post.validationError.message });
    
    return res.status(StatusCode.CREATED).json(post);
  }

  async update(req, res) {
    const { id } = req.params;
    const isBodyJson = isJson(rawBody);
    const body = isBodyJson ? JSON.parse(rawBody) : rawBody;

    const post = await this.service.update(id, body);
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
