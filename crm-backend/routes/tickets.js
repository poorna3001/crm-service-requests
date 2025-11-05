
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ticket = require('../models/Ticket');
const Activity = require('../models/Activity');

// create ticket (any authenticated user)
router.post('/', auth, async (req,res)=>{
  try{
    const {title, description, priority} = req.body;
    const ticket = new Ticket({title, description, priority, requester: req.user._id});
    await ticket.save();
    // activity log
    await Activity.create({entity:'Ticket', entityId:ticket._id, action:'created', performedBy:req.user._id, after:ticket});
    res.json(ticket);
  }catch(e){ res.status(500).json({msg:e.message}); }
});

// list tickets with optional filter & search
router.get('/', auth, async (req,res)=>{
  const {status, assignee, q} = req.query;
  const filter = {};
  if(status) filter.status = status;
  if(assignee) filter.assignee = assignee;
  if(q) filter.$or = [{title:{$regex:q,'$options':'i'}},{description:{$regex:q,'$options':'i'}}];
  const tickets = await Ticket.find(filter).populate('requester assignee','name email').sort({createdAt:-1});
  res.json(tickets);
});

// get single
router.get('/:id', auth, async (req,res)=>{
  const t = await Ticket.findById(req.params.id).populate('requester assignee','name email');
  if(!t) return res.status(404).json({msg:'Not found'});
  res.json(t);
});

// assign / update (admin/agent)
router.put('/:id', auth, async (req,res)=>{
  try{
    const before = await Ticket.findById(req.params.id);
    if(!before) return res.status(404).json({msg:'Not found'});
    const {status, assignee, comment} = req.body;
    const snapshotBefore = before.toObject();
    if(status) before.status = status;
    if(assignee) before.assignee = assignee;
    if(comment){
      before.comments.push({body:comment, author:req.user._id, createdAt: new Date()});
    }
    await before.save();
    await Activity.create({entity:'Ticket', entityId:before._id, action:'updated', performedBy:req.user._id, before:snapshotBefore, after:before});
    res.json(before);
  }catch(e){ res.status(500).json({msg:e.message}); }
});

module.exports = router;
