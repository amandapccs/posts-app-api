// const { PostModel } = require('./../posts/models/post.model');
// const mongoose = require('mongoose');
import { PostModel } from './../posts/models/post.model';
require('dotenv').config();
import mongoose from 'mongoose';

async function seed() {
  await mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('connected to mongodb');

  const posts = [
    {
      title: 'Hello World',
      content: 'This is my first post',
    },
    {
      title: 'Hello World 2',
      content: 'This is my second post',
    },
  ];

  try {
    await PostModel.insertMany(posts);
    console.log('posts created');
  } catch (error) {
    console.log('Erro no processo de seeding:', error);
  }

  await mongoose.connection.close();
}

seed();