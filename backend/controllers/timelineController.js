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


// delete screen

const deleteTimeline = async (req, res) => {
    const timelineId = req.params.id
    try {

        if (!timelineId || !ObjectId.isValid(timelineId)) {
            return res.status(200).json({ message: "No timeline Exists" })
        }
        else {
            const deletedTimeline = await Timeline.findByIdAndRemove(req.params.id)
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
export { addTimelines, deleteTimeline, getAllTimelines, getScreenById, deleteScreen, updateScreen };