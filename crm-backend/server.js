
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Connect to MongoDB
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/crm_demo';
mongoose.connect(MONGO).then(()=>{
  console.log('MongoDB connected');
  // auto-create admin if configured
  const User = require('./models/User');
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPass = process.env.ADMIN_PASSWORD;
  if(adminEmail && adminPass){
    (async ()=>{
      try{
        let u = await User.findOne({email: adminEmail});
        if(!u){
          u = new User({name:'Admin', email: adminEmail, password: adminPass, role:'admin'});
          await u.save();
          console.log('Auto-created admin user:', adminEmail);
        } else {
          console.log('Admin user already exists:', adminEmail);
        }
      }catch(e){ console.error('Admin create error', e.message); }
    })();
  }
}).catch(e=>console.error(e));

// Models
const User = require('./models/User');
const Ticket = require('./models/Ticket');
const Activity = require('./models/Activity');

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tickets', require('./routes/tickets'));

// simple health
app.get('/', (req,res)=>res.json({ok:true,msg:'CRM backend running'}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log('Server running on', PORT));
