import Costing from "../models/costingModel.js";
import { ObjectId } from "bson";

//Post Costing

const postCosting = async (req, res) => {
  try {
    const costings = req.body.costings;
    const updatedCosting = [];
    await Promise.all(
      costings.map(async (costing, index) => {
        if (!costing._id || !ObjectId.isValid(costing._id)) {
          console.log("existing costing", costing)
          const createdCosting = await Costing.create(costing)
          updatedCosting.push(createdCosting);
        }
        else {
          console.log(`Updating costing at index ${index}`);
          const result = await Costing.updateOne(
            { _id: costing._id },
            { $set: costing },
            {
              upsert: true,
              setDefaultsOnInsert: true,
            },
          )
          console.log(`Result of update for costing at index ${index}:`, result)
          updatedCosting.push(costing);
        }
      })
    )

    return res.status(200).json({ message: "Timeline added successfully", costings: updateCosting })
  } catch (error) {
    return res.status(400).json({ message: "Error creating timeline", error: error.message })
  }
};

//get Costing

const getCosting = (req, res) => {
  Costing.find({})
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//get CostingByProject

const getCostingByProject = (req, res) => {
  Costing.find({ projectId: req.query.projectId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//get CostingByTimeline

const getCostingByTimeline = (req, res) => {
  Costing.find({ timelineId: req.query.timelineId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};


//get update CostingByProject

const updateCosting = async (req, res) => {
  const costingsToUpdate = req.body.costings;

  try {
    await Promise.all(
      costingsToUpdate.map(async (costing) => {
        const filter = { timelineId: costing.timelineId };
        const update = {
          $set: {
            timelineTitle: costing.timelineTitle,
            hourRate: costing.hourRate,
            totalHours: costing.totalHours,
            totalCost: costing.totalCost,
            projectId: costing.projectId,
          },
        };

        const updatedCosting = await Costing.findOneAndUpdate(filter, update, { new: true });

        if (!updatedCosting) {
          throw new Error(`Costing with timelineId ${costing.timelineId} not found`);
        }
      })
    );

    return res.status(200).json({ message: "Costings updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Error updating costings", error: error.message });
  }
};
export { postCosting, getCosting, getCostingByProject, getCostingByTimeline, updateCosting };