const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripPlannerSchema = new Schema({
   user: {
      type: Schema.Types.ObjectId,
      ref: "users",
   },
   name: {
      type: String,
      required: true,
   },
   origin: {
      type: mongoose.Types.ObjectId,      
      default: undefined,
   },
   destination: {
      type: mongoose.Types.ObjectId,      
      default: undefined,
   },
   date: {
      type: Date,
      default: Date.now,
   },
});

module.exports = TripPlanner = mongoose.model("trips", TripPlannerSchema)

