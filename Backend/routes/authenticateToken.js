const jwt = require('jsonwebtoken');
require("dotenv").config();

async function authenticateToken(req, res, next) {
  const token = req.body.jwt;
  if (!token){
    //console.log('Access denied. No token provided.');
    res.status(404).json({"msg":"Access denied. No token provided"})
  }else{
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err){
          console.log('Invalid token.or EXPIRED');
          res.status(404).json({"msg":"Invalid token.or EXPIRED"})
      }else{
        if(user.id === req.body.uid){
          next();
        }
      }
    });
  }
  
}

module.exports = authenticateToken;