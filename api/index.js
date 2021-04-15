require('dotenv').config({
  path: `${__dirname}/.env`
});

const { v4: uuidv4 } = require('uuid');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const { logger } = require('./utils');
const { Post } = require('./models');
const { postRouter } = require('./routes');

app.use(express.json());
app.use('/posts', postRouter);

const uri = 'mongodb://localhost:27017/junocollege';

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => {
  console.log(`Successfull connected to: ${uri}`);
})
.catch((err) => {
  console.error(`Failed to connect: ${uri}`);
  console.error(err);
});

app.listen(process.env.PORT, () => {
  console.log(`API Server Listening on port ${process.env.PORT}...`);
});
