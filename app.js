const express = require('express');
const session = require('express-session');
// const knex = require('./db/knex.js');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const errorHandler = require('errorhandler');

var isProduction = process.env.NODE_ENV === 'production';


const app = express();

app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

// SESSION EXAMPLE
app.use(session({
  secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false
}));

if (!isProduction) {
  app.use(errorHandler());
}

require('./server/config/passport');

/* eslint-disable global-require */

app.use('/',
  [
    require('./server/routes/user_routes'),
    require('./server/routes/tool_routes'),
    require('./server/routes/survey_response_routes'),
    require('./server/routes/survey_routes')
  ]);

// app.use(require('./server/routes'));


if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}
/* eslint-enable global-require */
// app.use(require('./server/middleware/error_middleware').all);

module.exports = app;
