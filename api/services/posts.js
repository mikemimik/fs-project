const { Post } = require('../models');
const { HttpError, handleServiceError } = require('../utils');

exports.getAll = async () => {
  try {
    const posts = await Post.find();

    return posts.map((post) => {
      const { id, excerpt } = post;
      return { id, excerpt };
    });
  } catch (err) {
    const status = err.status || err.code || 500;
    const msg = err.msg || err.message;

    throw new HttpError(status, msg);
  }
};

exports.getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new HttpError(404, 'not found');
    }

    return post;
  } catch (err) {
    const status = err.status || err.code || 500;
    const msg = err.msg || err.message;

    throw new HttpError(status, msg);
  }
};

exports.createPost = (postData) => {
  // TODO: Add validation for post data
  return new Post(postData);
};
