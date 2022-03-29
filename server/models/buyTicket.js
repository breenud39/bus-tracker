const mongoose = require('mongoose');

const { Schema } = mongoose;

const buyTicketSchema = new Schema({
    buyTickeDate: {
    type: Date,
    default: Date.now
  },
  busRoot: [
    {
      type: Schema.Types.ObjectId,
      ref: 'busRoot'
    }
  ]
});

const buyTicke = mongoose.model('buyTicke',buyTicketSchema);

module.exports = buyTicke;