const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  excerpt: String,
  body: String,
  author: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = {
  Post,
};

