import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ScreenSchema = new Schema([
    {
        screenName: {
            type: String,
            required: true,
        },
        screenSections: {
            type: [String],
        },
        hours: {
            type: String,
            required: true,
        },
    },
], { _id: false });

const ScreenListSchema = new Schema([
    {
        screens: {
            type: [ScreenSchema],
            required: true,
        },
        projectId: {
            type: mongoose.Types.ObjectId,
            ref: "Project",
            //type: String,
        },
    },
], { _id: false });

const TimelineSchema = new Schema([{
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
    },
    screens: {
        type: [ScreenSchema],
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
