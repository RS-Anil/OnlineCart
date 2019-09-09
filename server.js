const config = require('config');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const users = require('./routes/users');
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.Promise = global.Promise;

const databaseUri = 'mongodb://localhost:27017/OnlineShopping';
mongoose.set('useCreateIndex', true)
mongoose.connect(databaseUri, { useNewUrlParser: true })
    .then(() => console.log(`Database connected !!!!!!!!!!!`))
    .catch(err => console.log(`Database connection error:`+err));

//app.use(express.json())
app.use(bodyParser.json());

app.use('/api/users', users);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));