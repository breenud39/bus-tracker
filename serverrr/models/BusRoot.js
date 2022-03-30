const mongoose = require('mongoose');
 
const { Schema } = mongoose;

const BusRootSchema = new Schema({
  root: {
    type: Number,
    required: true,
    trim: true
  },

  destinationTime: {
    type: Number,
    min: 0,
    default: 0
  },
  arrivalTime: {
    type: Number,
    min: 0,
    default: 0
  },
  
});

const  BusRoot = mongoose.model(' BusRoot', BusRootSchema);

module.exports = BusRoot;
