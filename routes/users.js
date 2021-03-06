'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models');

// Password Validate

User.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Password Encryption

User.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

// User POST Endpoint

router.post('/', (req, res, next) => {
  const required = ['username', 'password'];
  const missing = required.find(field => !(field in req.body));
  if (missing) {
    const err = new Error(`Missing ${missing} in request body`);
    err.status = 422;
    return next(err);
  }

  const {username, password} = req.body;

  return User.query()
    .findOne({username: username})
    .then(u => {
      if (u) {
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
      return User.query().insert(newUser)
    })
    .then(user => res.status(201).json(user))
    .catch(err => {
      console.log(err);
      return res.status(500).send(err);
    });
});

module.exports = router;