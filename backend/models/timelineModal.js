import mongoose from "mongoose";

const Schema = mongoose.Schema;
const itemSchema = new Schema(
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
    }
    , { _id: false });


const TimelineSchema = new Schema({
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
    },
    totalHours: {
        type: Number,
        required: true,
    },
    access_to: {
        type: [mongoose.Types.ObjectId],
        ref: "User"
    }
}
    , {
        timestamps: true,
        autoIndex: true,
        toJSON: { virtuals: true },
        versionKey: false,
        _id: true,
    }
);

TimelineSchema.virtual('costing', {
    ref: 'Costing',
    localField: '_id',
    foreignField: 'timelineId'
});

const Timeline = mongoose.model("Timeline", TimelineSchema);
export default Timeline;
