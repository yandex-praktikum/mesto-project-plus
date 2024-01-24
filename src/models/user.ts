import mongoose from 'mongoose';
import validator from 'validator';
import { IUser } from '../utils/types';

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => validator.isURL(v),
      },
    },
  },
  { versionKey: false },
);
export default mongoose.model<IUser>('user', UserSchema);
