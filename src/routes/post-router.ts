import { Router } from 'express';
import { PostController } from '../controllers/post-controller.js';
import verifyTokenMiddleware from '../middlewares/verify-token-middleware.js';

const router = Router();
const controller = new PostController();

router.post('/posts', verifyTokenMiddleware, controller.create);
router.get('/posts', verifyTokenMiddleware, controller.getAll);
router.put('/posts/:postId/like', verifyTokenMiddleware, controller.likePost);

export default router;