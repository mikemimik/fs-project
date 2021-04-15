const express = require('express');

const { HttpError, logger } = require('../utils');
const { postService } = require('../services');

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const posts = await postService.getAll();

      console.log('posts:', posts);
      // TODO: filter out fields; only id, and excerpt
      res.json(posts);
    } catch (err) {
      const error = (err instanceof HttpError) ? err : new HttpError(500);
      res.status(error.status).send(error.message);
      console.error(err);
    }
  })
  .post(async (req, res) => {
    const postData = req.body;

    logger(req);

    const { excerpt, body, author } = postData;
    const postDocument = postService.createPost({ author, body, excerpt });
    // const postDocument = new Post({ author, body, excerpt });

    try {
      await postDocument.save();
      res.status(201).json(postDocument);
    } catch (err) {
      res.status(500).send();
      console.error(err);
    }
  });

router.route('/:postId')
  .get(async (req, res) => {
    logger(req);
    const { postId } = req.params;
    try {
      const post = await postService.getPostById(postId);
      res.json(post);
    } catch (err) {
      if (err.status === 404) {
        return res.status(404).send();
      }
      res.status(500).send();
    }
  });

module.exports = router;
