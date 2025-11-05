
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// get all users (admin)
router.get('/', auth, async (req,res)=>{
  if(req.user.role !== 'admin') return res.status(403).json({msg:'Forbidden'});
  const users = await User.find().select('-password');
  res.json(users);
});

// get self
router.get('/me', auth, async (req,res)=>{ res.json(req.user); });

module.exports = router;
