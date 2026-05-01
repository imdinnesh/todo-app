import { Router } from 'express';
import { signUp, login } from '../controllers/auth.controller';
import { validateBody } from '../middleware/validate';
import { loginSchema, signUpSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/signup', validateBody(signUpSchema), signUp);
router.post('/login', validateBody(loginSchema), login);

export default router;
