import { ObjectId } from 'bson';
import Screen from "../models/screenModel.js";
import Timeline from "../models/timelineModal.js";

//add Screen


const addTimelines = async (req, res) => {
  try {
    const timelines = req.body.timelines;
    // console.log("timelines", timelines);
    await Promise.all(

      timelines.map(async (timeline, index) => {
        if (!timeline._id || !ObjectId.isValid(timeline._id)) {
          // timeline._id = new ObjectId();
          console.log("existing timeline", timeline)
          await Timeline.create(timeline)
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
        }
      })
    )

    return res.status(200).json({ message: "Timeline added successfully" })
  } catch (error) {
    return res.status(400).json({ message: "Error creating timeline", error: error.message })
  }
};

// const screen = new Screen({
//   screens: req.body.rowsData,
//   projectId: req.params.id,
// });
// screen
//   .save()
//   .then((result) => {
//     res.send(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const getAllTimelines = (req, res) => {
  Timeline.find({})
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
export { addTimelines, getAllTimelines, getScreenById, deleteScreen, updateScreen };