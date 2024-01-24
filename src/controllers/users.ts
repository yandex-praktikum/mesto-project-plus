import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import {
  INVALID_DATA_MESSAGE,
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
  STATUS_NOT_FOUND,
  STATUS_SUCCESS,
  USER_NOT_FOUND_MESSAGE,
  VALIDATION_ERROR_MESSAGE,
} from '../utils/consts';
import User from '../models/user';
import NotFoundError from '../utils/notFoundError';
import userUpdate from '../updates/userUpdate';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({});
    return res.status(STATUS_SUCCESS).send(users);
  } catch (error) {
    return next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).orFail(
      () => new NotFoundError(USER_NOT_FOUND_MESSAGE),
    );
    return res.status(STATUS_SUCCESS).send(user);
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFoundError') {
      return res.status(STATUS_NOT_FOUND).send({ message: STATUS_NOT_FOUND });
    }
    if (error instanceof mongoose.Error.CastError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ message: INVALID_DATA_MESSAGE });
    }
    return next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    return res.status(STATUS_CREATED).send(newUser);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res
        .status(STATUS_BAD_REQUEST)
        .send({ ...error, message: VALIDATION_ERROR_MESSAGE });
    }
    return next(error);
  }
};
export const updateUserInfo = userUpdate((req: Request) => {
  const { name, about } = req.body;
  return { name, about };
});

export const updateUserAvatar = userUpdate((req: Request) => {
  const { avatar } = req.body;
  return { avatar };
});
