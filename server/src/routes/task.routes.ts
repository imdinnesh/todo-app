import { Router } from 'express';
import { createTask, getTasks } from '../controllers/task.controller';
import { authenticated } from '../middleware/authenticated';
import { validateBody } from '../middleware/validate';
import { createTaskSchema } from '../schemas/task.schema';

const router = Router();

router.post('/', authenticated, validateBody(createTaskSchema), createTask);
router.get('/', authenticated, getTasks);

export default router;
