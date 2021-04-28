require('dotenv').config();

const { v4: uuidv4 } = require('uuid');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const config = require('./config');
const { logger } = require('./utils');
const { Post } = require('./models');
const { postRouter } = require('./routes');

app.use(express.json());
app.use('/posts', postRouter);

const uri = config.DATABASE_URL;

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => {
  console.log(`Successfull connected.`);
})
.catch((err) => {
  console.error(`Failed to connect.`);
  console.error(err);
});

app.listen(config.PORT, () => {
  console.log(`API Server Listening on port ${config.PORT}...`);
});
