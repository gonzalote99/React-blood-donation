const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  email: String,
  date: String,
  city: String,
})

module.exports = mongoose.model('Registrations', registrationSchema);