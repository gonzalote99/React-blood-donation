const mongoose = require('mongoose');


const personalSchema = new mongoose.Schema({
  fistname: String,
  lastname: String,
  dob: String,
  gender: String,
  bg: String,
  weight: String,
  mobile: String,
})

const addressSchema = new mongoose.Schema({
  area: String,
  city: String,
  pincode: String,
  state: String,
  country: String,
})

const userSchema = new mongoose.Schema({
  email: String,
  personal: {type : personalSchema},
  address: {type: addressSchema}
})

module.exports = mongoose.user('Users', userSchema);