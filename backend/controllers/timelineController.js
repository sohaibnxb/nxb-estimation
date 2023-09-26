import Screen from "../models/screenModel.js";
import Timeline from "../models/timelineModal.js";
import { ObjectId } from "mongoose";

//add Screen

const addTimelines = async (req, res) => {
    try {
        const timelines = req.body.timelines;
        console.log("timelines", timelines);
        await Promise.all(
            timelines.map(async timeline => {
                if (!timeline._id) {
                    timeline._id = new ObjectId();
                    console.log("timeline_id", timeline._id);
                }
                await Timeline.updateOne(
                    { _id: timeline?._id },
                    timeline,
                    {
                        upsert: true,
                        setDefaultsOnInsert: true,
                    },
                )
            })
        )

        return res.status(200).json({ message: "Timeline added successfully" })
    } catch (error) {
        return res.status(400).json({ message: "Error creating timeline", error: error.message })
    }
};

// get all screens

const getAllScreen = (req, res) => {
    Screen.find()
        .populate("projectId", "proj_name")
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
export { addTimelines, getAllScreen, getScreenById, deleteScreen, updateScreen };