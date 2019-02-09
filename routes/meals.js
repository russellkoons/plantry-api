'use strict';
const express = require('express');
const router = express.Router();
const { Meal } = require('../models');

router.get('/', (req, res) => {
  return Meal.query()
    .where('user_id', req.user.id)
    .eager('[ingredients, times]')
    .then(meals => res.status(201).json(meals))
    .catch(err => res.status(500).send({message: err}));
});

router.post('/', (req, res) => {
  const newMeal = req.body;
  newMeal.user_id = req.user.id;

  return Meal.query()
    .insertGraphAndFetch(newMeal)
    .then(m => res.status(201).json(m))
    .catch(err => res.status(500).send({message: err.message}));
});

router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id == req.body.id)) {
    const message = 'Request path ID and request body ID must match';
    res.status(400).json({message: message});
  }

  const update = req.body;
  update.user_id = req.user.id;
  
  return Meal.query()
    .upsertGraph(update)
    .then(u => res.status(201).json(u))
    .catch(err => res.status(500).send({message: err.message}));
})

module.exports = router;