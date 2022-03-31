const mongoose = require('mongoose');
 
const { Schema } = mongoose;

const busRootsSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
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

const  BusRoots = mongoose.model('BusRoots', busRootsSchema);

module.exports = BusRoots;
