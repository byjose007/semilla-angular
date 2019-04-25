import * as express from 'express';
import { Application } from 'express';

import { initRestApi } from './api/api';
import { apiErrorHandler } from './api/apiErrorHandler';

const bodyParser = require('body-parser');

const app: Application = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, OPTIONS, PUT, POST, DELETE, PATCH'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Authorization'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  // intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    // respond with 200
    res.sendStatus(200);
  } else {
    // move on
    next();
  }
});
app.use(bodyParser.json());

initRestApi(app);

app.use(apiErrorHandler);

app.listen(3000, () => {
  console.log('Server is now running on port 3000...');
});
