const routes = require('express').Router();
const people = require('../controllers/people');

routes.get('/people-like-you', people.get);

routes.get('/*', (req, res) => {
  res.status(404).json({ message: 'Route not found!' });
});

module.exports = routes;