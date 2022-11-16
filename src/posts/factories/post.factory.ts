import { PostRepository } from './../repositories/post.repository';
import { PostModel } from './../models/post.model';
import { PostController } from './../controllers/post.controller';
import { PostService } from './../services/post.service';

function postFactory() {
  const postRepository = new PostRepository(PostModel);
  const postService = new PostService(postRepository);
  const postController = new PostController(postService);

  return postController;
}

export const post = postFactory();
