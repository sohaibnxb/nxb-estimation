import mongoose from "mongoose";
import Timeline from "./timelineModal.js";
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  proj_name: {
    type: String,
    required: true,
  },
  proj_type: {
    type: String,
    required: true,
  },
  prepared_by: {
    type: String,
    required: true,
  },
  proposal_for: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  proj_description: {
    type: String,
    required: true,
  },
  proj_tags: {
    type: [String],
    lowercase: true,
  },
  proj_status: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  questions: {
    type: String,
  },
  temp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Temp",
  },
  resource_name: {
    type: String,
  },
},
  {
    timestamps: true,
    autoIndex: true,
    toJSON: { virtuals: true },
    versionKey: false,
    id: false,
  });

projectSchema.virtual('timelines', {
  ref: 'Timeline',
  localField: '_id',
  foreignField: 'projectId'
});

const Project = mongoose.model("Project", projectSchema);
export default Project;