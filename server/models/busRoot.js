const mongoose = require('mongoose');
 
const { Schema } = mongoose;

const busRootSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },


});

const  BusRoot = mongoose.model(' BusRoot', busRootSchema);

module.exports = BusRoot;
