const createError = require('http-errors');
const express = require('express');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const path = require('path')
const app = express();
const cors  =require('cors')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', usersRouter);
app.use('/', indexRouter);


module.exports = app;
