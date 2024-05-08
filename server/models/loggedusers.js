const mongoose = require('mongoose');

const loggedUserSchema = new mongoose.Schema({
  email: String,
  password: String,
})

module.exports = mongoose.model('loggedUser', loggedUserSchema);