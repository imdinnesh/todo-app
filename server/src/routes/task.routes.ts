import { Router } from 'express';
import { createTask } from '../controllers/task.controller';
import { authenticated } from '../middleware/authenticated';
import { validateBody } from '../middleware/validate';
import { createTaskSchema } from '../schemas/task.schema';

const router = Router();

router.post('/', authenticated, validateBody(createTaskSchema), createTask);

export default router;
