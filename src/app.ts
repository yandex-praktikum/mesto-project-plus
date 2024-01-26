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

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // Отправка ответа пользователю
  res.status(error.statusCode || SERVER_ERROR_MESSAGE).json({
    status: 'error',
    message: error.message || STATUS_SERVER_ERROR,
  });
  next();
});

/* mongoose.connect('mongodb://127.0.0.1:27017/mestodb'); */
const connect = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  // (временное решение)
  // eslint-disable-next-line no-console
  console.log('Подключились к базе');
  // (временное решение)
  // eslint-disable-next-line no-console
  await app.listen(PORT);

  // eslint-disable-next-line no-console
  console.log('Сервер запущен на порту:', PORT);
};
connect();
