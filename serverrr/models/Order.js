const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  buyTickets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BuyTicket'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
