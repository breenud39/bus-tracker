const mongoose = require('mongoose');

const { Schema } = mongoose;

const buyTicketSchema = new Schema({
    buyTicketDate: {
    type: Date,
    default: Date.now
  },
  busRoot: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BusRoot'
    }
  ]
});

const BuyTicket = mongoose.model('BuyTicket',buyTicketSchema);

module.exports = BuyTicket;