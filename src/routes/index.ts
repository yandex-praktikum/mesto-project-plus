import { Request, Response, Router } from 'express';

import userRouter from './user';
import { STATUS_NOT_FOUND, INVALID_DATA_MESSAGE } from '../utils/consts';
import cardsRouter from './cards';

const router = Router();
router.use('/users', userRouter);
router.use('/cards', cardsRouter);
router.use((_req: Request, res: Response) => {
  res.status(STATUS_NOT_FOUND).send(INVALID_DATA_MESSAGE);
});

export default router;
