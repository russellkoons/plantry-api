'use strict';
const express = require('express');
const router = express.Router();
const { Meal } = require('../models');

router.get('/', (req, res) => {
  return Meal.query()
    .where('user_id', req.user.id)
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

router.put('/', (req, res) => {
  const update = req.body;
  update.user_id = req.user.id;
  
  return Meal.query()
    .upsertGraph(update)
    .then(u => res.status(201).json(u))
    .catch(err => res.status(500).send({message: err.message}));
})

module.exports = router;