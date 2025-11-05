
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// register (open for demo)
router.post('/register', async (req,res)=>{
  try{
    const {name,email,password,role} = req.body;
    let user = await User.findOne({email});
    if(user) return res.status(400).json({msg:'Email exists'});
    user = new User({name,email,password,role});
    await user.save();
    res.json({msg:'Registered'});
  }catch(e){ res.status(500).json({msg:e.message}); }
});

// login
router.post('/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({msg:'Invalid creds'});
    const ok = await user.comparePassword(password);
    if(!ok) return res.status(400).json({msg:'Invalid creds'});
    const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET || 'secretkey', {expiresIn:'7d'});
    res.json({token, user:{id:user._id, name:user.name, email:user.email, role:user.role}});
  }catch(e){ res.status(500).json({msg:e.message}); }
});

module.exports = router;
