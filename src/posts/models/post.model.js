const { Schema, model } = require('mongoose');

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

const PostModel = model('Post', postSchema);

module.exports = { PostModel };