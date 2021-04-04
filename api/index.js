require('dotenv').config({
  path: `${__dirname}/.env`
});

const express = require('express');

const app = express();

// Logging Function
function logEverything (req) {
  console.log(
    'path:', req.path,
    'method:', req.method,
    'params:', req.params,
    'body:', req.body,
  );
}

app.use('/api', (req, res) => {
  console.group('handling request: /api');
  logEverything(req);
  console.groupEnd();

  res.json({
    data: []
  });
});

app.listen(process.env.PORT, () => {
  console.log(`API Server Listening on port ${process.env.PORT}...`);
});
