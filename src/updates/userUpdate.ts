import mongoose, { ObjectId } from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { UserData, UpdateUserData } from '../utils/types';
import User from '../models/user';
import {
  STATUS_SUCCESS,
  STATUS_BAD_REQUEST,
  VALIDATION_ERROR_MESSAGE,
} from '../utils/consts';

const updateUser = async (
  id: string | ObjectId,
  data: UpdateUserData,
) => User.findByIdAndUpdate(id, data, {
  new: true,
  runValidators: true,
});
// eslint-disable-next-line no-unused-vars
const userUpdate = (dataExtractor: (req: Request) => UserData) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = dataExtractor(req);
    const { id } = req.params;
    const updatedUser = await updateUser(id, data);
    return res.status(STATUS_SUCCESS).send(updatedUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ message: VALIDATION_ERROR_MESSAGE });
    }
    return next(error);
  }
};

export default userUpdate;
