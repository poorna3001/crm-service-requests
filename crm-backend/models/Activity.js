
const mongoose = require('mongoose');
const ActivitySchema = new mongoose.Schema({
  entity: String,
  entityId: mongoose.Schema.Types.ObjectId,
  action: String,
  performedBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  before: mongoose.Schema.Types.Mixed,
  after: mongoose.Schema.Types.Mixed,
  createdAt: {type:Date, default: Date.now}
});
module.exports = mongoose.model('Activity', ActivitySchema);
