'use strict';
const express = require('express');
const router = express.Router();
const {Plan, Meal, User} = require('../models');

router.post('/', (req, res) => {
  const date = 'date';
  if (!(date in req.body)) {
    return res.status(400).send({message: 'Request must include date'});
  }
  const meals = req.body.meals.map(m => Meal.findOrCreate({where: {meal: m.meal}, defaults: {meal: m.meal, time: m.time, notes: m.notes}}).spread((meal, created) => meal));

  User.findByPk(req.user.id)  
    .then(() => Plan.create(req.body))
    .then(plan => Promise.all(meals).then(storedMeals => plan.addMeals(storedMeals)).then(() => plan))
    .then(plan => Plan.findOne({ where: {id: plan.id}, include: [User, Meal]}))
    .then(_plan => res.status(201).json(_plan))
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
        id: req.params.id
      }
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: err.message}));
});

router.delete('/:id', (req, res) => {
  return Plan
    .destroy({
      where: {
        id: req.params.id
      }
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({message: err.message}));
});

module.exports = router;