import mongoose from 'mongoose';
import validator from 'validator';
import { ICard } from '../utils/types';

const CardSchema = new mongoose.Schema<ICard>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => validator.isURL(v),
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);
export default mongoose.model<ICard>('card', CardSchema);
