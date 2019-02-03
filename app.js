const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(morgan('common'));
app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get('*', (req, res) => {
  res.json({ok: true});
});

module.exports = {app};