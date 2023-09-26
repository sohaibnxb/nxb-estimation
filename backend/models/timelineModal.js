import mongoose from "mongoose";
const Schema = mongoose.Schema;
const itemSchema = new Schema([
    {
        itemName: {
            type: String,
            required: true,
        },
        subItems: {
            type: [String],
        },
        hours: {
            type: String,
            required: true,
        },
    },
], { _id: false });


const TimelineSchema = new Schema([{
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
    },
    items: {
        type: [itemSchema],
        required: true,
    },
    timelineTitle: {
        type: String,
        required: true,
    }
}
],
);

const Timeline = mongoose.model("Timeline", TimelineSchema);
export default Timeline;
