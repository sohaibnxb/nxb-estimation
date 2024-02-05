import Screen from "../models/screenModel.js";
import Timeline from "../models/timelineModal.js";
import { ObjectId } from "bson";

//add Screen

const addTimelines = async (req, res) => {

    try {
        const timelines = req.body.timelines;
        const updatedTimelines = [];
        await Promise.all(

            timelines.map(async (timeline, index) => {
                if (!timeline._id || !ObjectId.isValid(timeline._id)) {
                    console.log("existing timeline", timeline)
                    const createdTimeline = await Timeline.create(timeline)
                    updatedTimelines.push(createdTimeline);
                }
                else {
                    console.log(`Updating timeline at index ${index}`);
                    const result = await Timeline.updateOne(
                        { _id: timeline._id },
                        { $set: timeline },
                        {
                            upsert: true,
                            setDefaultsOnInsert: true,
                        },
                    )
                    console.log(`Result of update for timeline at index ${index}:`, result)
                    updatedTimelines.push(timeline);
                }
            })
        )

        return res.status(200).json({ message: "Timeline added successfully", timelines: updatedTimelines })
    } catch (error) {
        return res.status(400).json({ message: "Error creating timeline", error: error.message })
    }
};

// edit timeline access
const editTimelinesAccess = async (req, res) => {
    const { timelineId, userId } = req.body;
    try {
        if(!timelineId || !ObjectId.isValid(timelineId)) {
            return res.status(204).json({ message: "No timeline Exists" });
        }
        let existedTimeline = await Timeline.findById(timelineId);
        if(!existedTimeline) {
            res.status(404).json({message: "Timeline not found"});
        }
        // Check if the user ID is already in the access_to array
        if(!existedTimeline.access_to.includes(userId)) {
            existedTimeline.access_to.push(userId);
            await existedTimeline.save();
            res.status(200).json({message: "Access granted successfully"});
        } else {
            res.status(200).json({message: "User already has access to the timeline"});
        }
    } catch (error) {
        console.error('Error updating timeline access:', error.message);
    }
}

// delete screen
const deleteTimeline = async (req, res) => {
    const timelineId = req.params.id
    try {

        if (!timelineId || !ObjectId.isValid(timelineId)) {
            return res.status(200).json({ message: "No timeline Exists" })
        }
        else {
            const deletedTimeline = await Timeline.findByIdAndDelete(timelineId);
            return res.status(200).json({ message: "Timeline deleted successfully", deletedTimeline });
        }
    } catch (error) {
        return res.status(400).json({ message: "Error deleting timeline", error })
    }

};

// get all screens
const getAllTimelines = (req, res) => {
    Timeline.find()
        .populate("costing")
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

// get single screen

const getScreenById = (req, res) => {
    Screen.findOne({ projectId: req.query.project_id })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
};
// delete screen

const deleteScreen = (req, res) => {
    Screen.findByIdAndRemove(req.params.id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
};
// update screen details

const updateScreen = (req, res) => {
    Screen.findOneAndUpdate(
        { projectId: req.body.project_id },
        { screens: req.body.screens },
        { new: true }
    )
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
};
export { addTimelines, deleteTimeline, getAllTimelines, getScreenById, deleteScreen, updateScreen, editTimelinesAccess };