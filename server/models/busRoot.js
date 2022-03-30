const mongoose = require('mongoose');
 
const { Schema } = mongoose;

const BusRootsSchema = new Schema({
  id: {
    type: Integer,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
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

const  BusRoots = mongoose.model('BusRoots', BusRootsSchema);

module.exports = BusRoots;
