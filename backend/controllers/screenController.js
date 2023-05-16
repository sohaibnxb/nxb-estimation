import Screen from "../models/screenModel.js";

//add Screen

const addScreen = (req, res) => {
  const screen = new Screen({
    screens: req.body.rowsData,
    projectId: req.params.id,
  });
  screen
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
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
export { addScreen, getAllScreen, getScreenById, deleteScreen, updateScreen };
