'use strict';
const express = require('express');
const router = express.Router();
const { Plan } = require('../models');

router.get('/', (req, res) => {
  return Plan.query()
    .where('user_id', req.user.id)
    .then(plans => res.status(201).json(plans))
    .catch(err => res.status(500).send({message: err}));
})

router.post('/', (req, res) => {
  const date = 'date';
  if (!(date in req.body)) {
    return res.status(400).send({message: 'Request must include date'});
  }

  const newPlan = req.body;
  newPlan.user_id = req.user.id;
  
  return Plan.query()
    .insertGraphAndFetch(newPlan)
    .then(p => res.status(201).json(p))
    .catch(err => res.status(500).send({message: err.message}));
});

router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id == req.body.id)) {
    const message = 'Request path ID and request body ID must match';
    res.status(400).json({message: message});
  }

  const update = req.body;
  update.user_id = req.user.id;

  return Plan.query()
    .upsertGraph(update)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: err.message}));
});

router.delete('/:id', (req, res) => {
  return Plan.query()
    .deleteById(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: err.message}));
});

module.exports = router;