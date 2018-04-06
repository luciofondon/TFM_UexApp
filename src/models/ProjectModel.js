var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var projectSchema = new Schema({
  name: {
    type: String, 
    required: true
  },
  key: {
    type: String,
    required: true    
  },
  lead: {
    type: String
  }, 
  type: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now,
    required:true
  } 
});

projectSchema.statics.load = function(projectId, callback) {
  this.findOne({_id: projectId}).exec(callback);
};


module.exports = mongoose.model('Project', projectSchema);
