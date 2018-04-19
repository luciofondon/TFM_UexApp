var UserSchema = require('mongoose').model('UserModel').schema;

 animalSchema.query.byName = function(name) {
    return this.find({ name: new RegExp(name, 'i') });
  };

  var Animal = mongoose.model('Animal', animalSchema);
  Animal.find().byName('fido').exec(function(err, animals) {
    console.log(animals);
  });
