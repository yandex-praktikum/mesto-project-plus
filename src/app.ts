import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { SERVER_ERROR_MESSAGE, STATUS_SERVER_ERROR } from './utils/consts';
import router from './routes';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '65a982f95f0a6d162a1881d1',
  };

  next();
});
app.use(router);

app.use((error: any, req: Request, res: Response) => {
  // Если у ошибки нет статуса, используйте код статуса 500 (Internal Server Error)
  const statusCode = error.statusCode || STATUS_SERVER_ERROR;

  // Отправка ответа пользователю с соответствующим статусом
  res.status(statusCode).json({ status: 'error', message: error.message || SERVER_ERROR_MESSAGE });
});

/* mongoose.connect('mongodb://127.0.0.1:27017/mestodb'); */
const connect = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  await app.listen(PORT);
};
connect();
