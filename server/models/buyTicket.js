const mongoose = require('mongoose');

const { Schema } = mongoose;

const buyTicketSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        trim: true
      },
      price: {
        type: Number,
        required: true,
        min: 0.99
      },
     
  busRoot: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BusRoot'
    }
  ]
});

const BuyTicke = mongoose.model('buyTicke',buyTicketSchema);

module.exports = BuyTicke;