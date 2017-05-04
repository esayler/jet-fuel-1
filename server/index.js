const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const redirect = require('./redirect');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/v1', router);
app.use('/', redirect);

app.listen(app.get('port'), () => {
  console.log(`Server is listening on ${app.get('port')}.`)
});