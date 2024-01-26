import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card';
import NotFoundError from '../utils/notFoundError';
import {
  STATUS_SUCCESS,
  CARD_NOT_FOUND_MESSAGE,
} from '../utils/consts';

const modifyCardLikes = (operation: '$addToSet' | '$pull') => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId) {
      res.status(400).send('Недопустимый ID карточки');
      return;
    }

    const updatedCard = await Card.findByIdAndUpdate(
      id,
      { [operation]: { likes: userId } },
      { new: true },
    )
      .populate({ path: 'owner', select: '_id' })
      .populate({ path: 'likes', select: '_id' });

    if (!updatedCard) {
      throw new NotFoundError(CARD_NOT_FOUND_MESSAGE);
    }

    res.status(STATUS_SUCCESS).send(updatedCard);
  } catch (error : any) {
    if (error.name === 'CastError') {
      res.status(400).send('Недопустимый ID карточки');
      return;
    }
    next(error);
  }
};

export default modifyCardLikes;
