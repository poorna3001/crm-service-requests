
const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = async function(req,res,next){
  const header = req.headers.authorization;
  if(!header) return res.status(401).json({msg:'No token'});
  const token = header.split(' ')[1];
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = await User.findById(payload.id).select('-password');
    next();
  }catch(e){ res.status(401).json({msg:'Invalid token'}); }
};
