const jwt = require('jsonwebtoken');
require('dontev').config();

module.exports.auth = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if(token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if(err) 
        res.status(400).json({
          message: 'err'
        })
      else {
        req.decodedToken = decodedToken;
        next();
      }
      
    })
  }
  else 
    res.status(401).json({
      messagae: 'err'
    })
}