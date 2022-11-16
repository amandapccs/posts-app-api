import { Router } from 'express';
import { post } from '../posts/factories/post.factory';

const router = Router();

router.get("/", post.getAll.bind(post));
router.get("/:id", post.getById.bind(post));
router.post("/", post.create.bind(post));
router.put("/:id", post.update.bind(post));
router.delete("/:id", post.delete.bind(post));

export default router;