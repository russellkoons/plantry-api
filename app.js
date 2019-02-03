const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwtAuth = require('./middleware/jwt-auth');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const planRouter = require('./routes/plans');

const app = express();

app.use(cors());
app.use(morgan('common'));
app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/plans', jwtAuth, planRouter);

module.exports = {app};