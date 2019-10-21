const config = require('config');
const mongoose = require('./db/server');

var bodyParser = require('body-parser');

const routeIndex =require("./routes/index")
const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors({
  credentials: true,
}));

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.Promise = global.Promise;




app.use(bodyParser.json());
console.log('Called');
app.use(routeIndex);


//app.use('/api/users', users);
//app.use(routeIndex)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));