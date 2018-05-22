var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var rolSchema = new Schema({
  description: {
    type: String
  },
  level: {
    type: Number
  },
  created: {
    type: Date,
    default: Date.now
  }
},
{
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at'
	}
});

module.exports = mongoose.model('Rol', rolSchema);
