const express = require('express');
// const knex = require('./db/knex.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* eslint-disable global-require */
app.use('/',
  [
    require('./server/routes/user_routes'),
    require('./server/routes/tool_routes'),
    require('./server/routes/survey_response_routes'),
    require('./server/routes/survey_routes')
  ]);
/* eslint-enable global-require */

module.exports = app;
