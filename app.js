const express = require('express');
const app = express();
const PORT = require('../config/config')

app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

module.exports = {app};