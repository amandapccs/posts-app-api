const { post } = require('./src/posts/factories/post.factory');
const mongoose = require('mongoose');
require('dotenv').config();
const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/", post.getAll.bind(post));
app.get("/:id", post.getById.bind(post));
app.post("/", post.create.bind(post));
app.put("/:id", post.update.bind(post));
app.delete("/:id", post.delete.bind(post));

let cachedDb = null; //espaço de memória para armazenar o banco de dados
const uri = process.env.MONGO;

module.exports.handler = serverless(
  app,
  {
    request: async (request, event, context) => {
      context.callbackWaitsForEmptyEventLoop = false;

      if (cachedDb === null) {
        cachedDb = mongoose.connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true, serverSelectionTimeoutMS: 5000
        });
      }

      await cachedDb;
    },
  }
);
