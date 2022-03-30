const mongoose = require('mongoose');

const { Schema } = mongoose;

const buyTicket = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
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

const BuyTicket = mongoose.model('BuyTicket', orderSchema);

module.exports = BuyTicket;
