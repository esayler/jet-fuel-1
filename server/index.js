const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const router = require('./router');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '../public')));

// app.use('/api/v1', router);

app.listen(app.get('port'), () => {
  console.log(`Server is listening on ${app.get('port')}.`)
});


//Get All Reqs
app.get('/api/v1/folders', (request, response) => {
  database('folders').select()
    .then(folders => {
      response.status(200).json(folders);
    })
    .catch(error => {
      console.error('error:', error);
    })
})

app.get('/api/v1/urls', (request, response) => {
  database('urls').select()
    .then(urls => {
      response.status(200).json(urls)
    })
    .catch(error => {
      console.error('error:', error);
    })
})


//Get individual Folder urls
app.get('/api/v1/folders/:id/urls', (request, response) => {
  const id = parseInt(request.params.id, 10);
  database('urls').where('folder_id', id).select()
    .then(urls => {
      response.status(200).json(urls)
    })
    .catch(error => {
      console.error('error:', error);
    })
})


//Short URL redirect
app.get('/:id', (request, response) => {
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


//Post Reqs
app.post('/api/v1/folders', (request, response) => {
  const { folder_name } = request.body;
  database('folders').insert({ folder_name }, ['id', 'folder_name'])
    .then(folder => {
      response.status(201).json(...folder)
    })
    .catch(error => {
      console.error('error:', error);
    })
})

app.post('/api/v1/urls', (request, response) => {
  const { url, activeFolder } = request.body;
  if(!activeFolder) { return response.sendStatus(400) }

  database('urls').insert({ long_url: url, folder_id: activeFolder, visits: 0 }, ['id', 'long_url', 'visits' ])
    .then(url => {
      response.status(201).json(...url)
    })
    .catch(error => {
      console.error('error:', error);
    })
})