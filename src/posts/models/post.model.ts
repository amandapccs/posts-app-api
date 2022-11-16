import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: [String],
    required: true,
  },
  content: {
    type: [String],
  },
  insertedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: [Date],
  },
}, { versionKey: false });

export const PostModel = model('Post', postSchema);