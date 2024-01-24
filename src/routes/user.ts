import { Router } from 'express';
import {
  createUser,
  getUserById,
  getUsers,
  updateUserAvatar,
  updateUserInfo,
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', getUserById);

userRouter.post('/', createUser);

userRouter.patch('/me', updateUserInfo);
userRouter.patch('/me/avatar', updateUserAvatar);
export default userRouter;
