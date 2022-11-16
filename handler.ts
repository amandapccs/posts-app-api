require('dotenv').config();
import { post } from './src/posts/factories/post.factory';
import mongoose, { ConnectOptions } from 'mongoose';
import serverless from 'serverless-http';
import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());

app.get("/", post.getAll.bind(post));
app.get("/:id", post.getById.bind(post));
app.post("/", post.create.bind(post));
app.put("/:id", post.update.bind(post));
app.delete("/:id", post.delete.bind(post));

let cachedDb: null | Promise<unknown> = null; //espaço de memória para armazenar o banco de dados
const uri: string | any = process.env.MONGO;

module.exports.handler = serverless(
  app,
  {
    request: async (_request: any, _event: any, context: any) => {
      context.callbackWaitsForEmptyEventLoop = false;

      if (cachedDb === null) {
        cachedDb = mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true, serverSelectionTimeoutMS: 5000
        } as ConnectOptions);
      }

      await cachedDb;
    },
  }
);
