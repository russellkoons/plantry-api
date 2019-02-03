'use strict';
const express = require('express');
const router = express.Router();
const {User} = require('../models');

router.post('/', (req, res, next) => {
  const required = ['username', 'password'];
  const missing = required.find(field => !(field in req.body));
  if (missing) {
    const err = new Error(`Missing ${missing} in request body`);
    err.status = 422;
    return next(err);
  }

  const {username, password} = req.body;

  return User.count({
    where: {
      username: username
    }
  })
    .then(count => {
      if (count > 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      return User.hashPassword(password);
    })
    .then(hash => {
      const newUser = {
        username,
        password: hash
      };
      return User.create(newUser)
    })
    .then(user => res.status(201).json(user.apiRepr()))
    .catch(err => {
      return res.status(500).send(err);
    });
});

module.exports = router;