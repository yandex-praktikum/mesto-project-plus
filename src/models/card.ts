import {
  Schema,
  model,
  ObjectId,
  Types,
} from 'mongoose';
import {REGEX} from '../types/constants'

interface ICard {
  name: string;
  link: string;
  owner: ObjectId;
  likes: Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(url: string) {
        return REGEX.test(url);
      },
      message: 'Неверный адрес изображения для карточки',
    },
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<ICard>('card', cardSchema);