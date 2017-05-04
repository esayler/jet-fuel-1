const express = require('express');
const redirect = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

//Short URL redirect
redirect.get('/:id', (request, response) => {
  const id = parseInt(request.params.id);
  database('urls').where('id', id).increment('visits', 1)
    .then(() => {
      return database('urls').where('id', id).select('long_url')
    })
    .then(matchedURL => {
      const { long_url } = matchedURL[0];
      response.redirect(`http://${long_url}`);
    })
})

module.exports = redirect;