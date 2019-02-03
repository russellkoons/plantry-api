'use strict';
const express = require('express');
const router = express.Router();
const {Plan} = require('../models');

router.post('/', (req, res) => {
  const date = 'date';
  if (!(date in req.body)) {
    return res.status(400).send({message: 'Request must include date'});
  }

  return Plan
    .create({
      date: req.body.date,
      user_id: req.user.id
    })
    .then(plan => res.status(201).json(plan.apiRepr()))
    .catch(err => res.status(500).send({message: err.message}));
});

router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = 'Request path ID and request body ID must match';
    res.status(400).json({message: message});
  }

  const date = 'date';
  const update = {};
  if (date in req.body) {
    update[date] = req.body[date];
  }

  return Plan
    .update(update, {
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: err.message}));
});

router.delete('/:id', (req, res) => {
  return Plan
    .destroy({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: err.message}));
});

module.exports = router;