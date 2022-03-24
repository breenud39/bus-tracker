const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSavedBusDataSchema = new Schema({
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
});

const userSavedBusDataSchema = model(
  "userSavedBusDataSchema",
  userSavedBusDataSchema
);

module.exports = User;
