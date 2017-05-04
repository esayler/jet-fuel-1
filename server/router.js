const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

//Get All Reqs
router.get('/folders', (request, response) => {
  database('folders').select()
    .then(folders => {
      response.status(200).json(folders);
    })
    .catch(error => {
      console.error('error:', error);
    })
})

router.get('/urls', (request, response) => {
  database('urls').select()
    .then(urls => {
      response.status(200).json(urls)
    })
    .catch(error => {
      console.error('error:', error);
    })
})

//Get individual Folder urls
router.get('/folders/:id/urls', (request, response) => {
  console.log('folder urls');
  const id = parseInt(request.params.id, 10);
  database('urls').where('folder_id', id).select()
    .then(urls => {
      response.status(200).json(urls)
    })
    .catch(error => {
      console.error('error:', error);
    })
})

//Post Reqs
router.post('/folders', (request, response) => {
  const { folder_name } = request.body;
  console.log('post folder');
  database('folders').insert({ folder_name }, ['id', 'folder_name'])
    .then(folder => {
      response.status(201).json(...folder)
    })
    .catch(error => {
      console.error('error:', error);
    })
})

router.post('/urls', (request, response) => {
  const { url, activeFolder } = request.body;
  console.log('post url');
  if(!activeFolder) { return response.sendStatus(400) }

  database('urls').insert({ long_url: url, folder_id: activeFolder, visits: 0 }, ['id', 'long_url', 'visits', 'created_at' ])
    .then(url => {
      response.status(201).json(...url)
    })
    .catch(error => {
      console.error('error:', error);
    })
})

module.exports = router;