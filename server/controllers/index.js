const bcrypt = require('bcrypt');
const Users = require('../models/users');
const LoggedUsers = require('../models/loggedusers');
const Registration = require('../models/registrations');

const {generateToken} = require('../utils');

module.exports.getTotalRegistrations = async (req, res) => {
  try {
    const count = await Registration.countDocuments({})

    res.status(200).json({
      resigstrations: count,
      message: 'number'
    });
  } catch(err) {
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports.getUser = async (req, res) => {
  try {
    const user = await Users.findOne({email: req.query.email});

    if(user == null) 
      throw new Error('invalid')

      res.status(200).json({
        user: user,
        message: 'valid'
        
      });
    

   
    }  catch(err) {
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports.getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({email: req.query.email});

    res.status(200).json({
      registrations: registrations,
      message: 'regist'
    });
  }
  catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}


module.exports.addUser = async (req, res) => {
  try {
    const userExist = await LoggedUsers.find({email : req.body.email});

    if(userExist.length !== 0) 
      throw new Error('exists')

    const passwordPattern = /^(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[$@%!]+).{8,}$/;

    if(!passwordPattern.test(req.body.password))
      throw new Error('error')

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new LoggedUsers({
      email: req.body.email,
      password: hashedPassword
    })

    await user.save();

    res.status(200).json({
      message: 'add'
    })
  } catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports.registerUser = async (req, res) => {
  try {
    const user = await Users.find({email: req.body.email});

    if(user.length !== 0) 
      throw new Error('reg')

    const register = new Users(req.body);
    await register.save();
    res.status(200).json({
      message: 'registerd'
    })
  } catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports.updateUser = async (req, res) => {
  try {
    const user = await Users.findOne({email: req.body.emai});

    if(user == null) 
      throw new Error('error')
      
    await Users.updateOne({email: req.body.email}, req.body);

    res.status(200).json({
      message: 'updated'
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports.validateUser = async (req, res) => {
  try {
    const user = await LoggedUsers.findOne({email: req.body.email});

    if(user == null) 
      throw new Error('error')

    if(await bcrypt.compare(req.body.password, user.password)) {
      const token = generateToken(user.email);

      res.status(200).json({
        email: user.email,
        message: 'valid',
        access_token: token,
      })
    } else {
      throw new Error('error');
    }
  } catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports.donateRegister = async (req ,res) => {
  try {
    const user = await Users.findOne({email: req.body.email});

    if(user == null) 
      throw new Error('error')


    const register = Registration({
      email: req.body.email,
      city: req.body.city,
      date: req.body.date,
    })

   await register.save();

    res.status(200).json({
      message: 'reg'
    })

    
  } catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports.authorizerUser = async (req, res) => {
  try {
    const userExist = await Users.exists({email: req.decodedToken.email});

    res.status(200).json({
      message: 'auth',
      access_token: {
        ...req.decodedToken,
        isRegister: userExist
      }
    })
  }
}