const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSavedBusRoute = new Schema({
  id: {
    type: Integer,
    required: true,
    trim: true
  },
  BusNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  BusId: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  Stops: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  tripPlanner:{
    type: Schema.Types.ObjectId,
    ref: 'TripPlanner',
    required: true


  }
});

const userSavedBusRouteVar = mongoose.model(
  "userSavedBusRouteSchema",
  userSavedBusRouteSchema
);

module.exports = userSavedBusRouteVar;