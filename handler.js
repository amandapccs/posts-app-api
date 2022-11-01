const { post } = require('././src/posts/factories/post.factory');
const mongoose = require('mongoose');
require('dotenv').config();
const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Max-Age", "3600");
//   res.header("Access-Control-Expose-Headers", "Content-Length");
//   res.header(
//     "Access-Control-Request-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   next();
// });

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
