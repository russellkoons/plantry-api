const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const jwtAuth = require('./middleware/jwt-auth');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const planRouter = require('./routes/plans');
const mealRouter = require('./routes/meals');

const app = express();

// Building the basic Express app

app.use(cors());
app.use(morgan('common'));
app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/plans', jwtAuth, planRouter);
app.use('/meals', jwtAuth, mealRouter);

app.get('/', (req, res) => {
  return res.status(200).json({message: 'Hello there'})
})

module.exports = {app};