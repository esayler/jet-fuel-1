const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const router = require('./router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.set('port', process.env.PORT || 3000);

app.locals.urls = [];
app.locals.folders = [];

app.use(express.static(path.join(__dirname, '../public')));

// app.use('/api/v1', router);

app.listen(app.get('port'), () => {
  console.log(`Server is listening on ${app.get('port')}.`)
});


//Get All Reqs
app.get('/api/v1/folders', (request, response) => {
  response.json(app.locals.folders)
})

app.get('/api/v1/urls', (request, response) => {
  response.json(app.locals.urls)
})


//Get individual Folder urls
app.get('/api/v1/folders/:id/urls', (request, response) => {
  const id = parseInt(request.params.id, 10);
  const matchedURLs = app.locals.urls.filter(url => id === url.activeFolder)
  response.json( matchedURLs )
})


//Short URL redirect
app.get('/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const matchedURL = app.locals.urls.filter(url => id === url.id);
  const longURL = matchedURL[0].url;

  matchedURL[0].visits++;

  response.redirect(`http://${longURL}`)
})


//Post Reqs
app.post('/api/v1/folders', (request, response) => {
  const id = app.locals.folders.length +1;
  const { folderName } = request.body;

  app.locals.folders.push({ id, folderName })
  response.json({ id, folderName })
})

app.post('/api/v1/urls', (request, response) => {
  const id = app.locals.urls.length +1;
  const { url, activeFolder } = request.body;
  const visits = 0

  if(!activeFolder) { return response.sendStatus(400) }

  app.locals.urls.push({ id, url, activeFolder, visits })
  response.json({ id, url, visits })
})