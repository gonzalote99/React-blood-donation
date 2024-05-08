const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoute = require('./routes/index');
require('dotenv').config();
const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use('/', usersRoute);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser : true , useUnifiedTopology : true});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('connect');
});

connection.on('error', () => {
  console.log('error');
});

app.listen(port, (err) => {
  if(err) console.log(err.message)
  console.log('conn')
} )
