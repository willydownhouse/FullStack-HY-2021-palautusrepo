const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const morgan = require('morgan');
const cors = require('cors');
require('express-async-errors');

const blogRouter = require('./routes/blogRoutes');
const userRouter = require('./routes/userRoutes');
const middleware = require('./utils/middleware');

const app = express();

//DB CONNECTION

const db = config.DB_CONNECTION;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch(() => {
    console.log('there was a problem connecting to database');
  });

app.use(morgan('dev'));

app.use(express.json());

app.use(cors());

//app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
