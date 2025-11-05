
const mongoose = require('mongoose');
const TicketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {type:String, enum:['open','in_progress','resolved','closed'], default:'open'},
  requester: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  assignee: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  priority: {type:String, enum:['low','medium','high'], default:'medium'},
  comments: [{body:String, author:{type: mongoose.Schema.Types.ObjectId, ref:'User'}, createdAt:Date}],
  createdAt: {type:Date, default: Date.now},
  updatedAt: {type:Date, default: Date.now}
});
TicketSchema.pre('save', function(next){ this.updatedAt = Date.now(); next(); });
module.exports = mongoose.model('Ticket', TicketSchema);
