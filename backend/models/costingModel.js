import mongoose, { Mongoose } from "mongoose";
const Schema = mongoose.Schema;

const costingSchema = new Schema({
  timelineTitle: {
    type: String,
    required: true,
  },
  hourRate: {
    type: Number,
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    required: true,

  },
  timelineId: {
    type: mongoose.Types.ObjectId,
    ref: "Timeline",
    required: true,
  },
});

const Costing = mongoose.model("Costing", costingSchema);
export default Costing;
