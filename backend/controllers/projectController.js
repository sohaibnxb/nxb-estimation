import Project from "../models/projectModel.js";
import { ObjectId } from "bson";

//create Project

const addProject = (req, res) => {
  const {
    proj_name,
    proj_type,
    prepared_by,
    proposal_for,
    team,
    created_date,
    version,
    proj_description,
    proj_tags,
    proj_status,
    notes,
    questions,
    temp_id,
    resource_name,
  } = req.query;
  if (
    !proj_name ||
    !proj_type ||
    !prepared_by ||
    !proposal_for ||
    !team ||
    !created_date ||
    !proj_description ||
    !version
    // !temp_id ||
    // !resource_name
  ) {
    return res.status(422).json({ error: "please fill the fields properly" });
  }

  let access_to = [];
  if(req.query.access_to) {
    access_to.push(req.body.access_to);
  }
  
  Project.findOne({ proj_name: proj_name })
    .then((projectExist) => {
      if (projectExist) {
        return res.status(422).json({ error: "Project already exist" });
      }

      const proj = new Project({
        proj_name: proj_name,
        proj_type: proj_type,
        prepared_by: prepared_by,
        proposal_for: proposal_for,
        team: team,
        created_date: created_date,
        proj_description: proj_description,
        proj_tags: proj_tags,
        proj_status: proj_status,
        version: version,
        temp_id: temp_id,
        resource_name: resource_name,
        notes: notes,
        questions: questions,
        access_to: access_to ? access_to : []
      });
      proj
        .save()
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// get all projects by template
const getAllProject = async (req, res) => {
try {
    const projectsByManger = await Project.find({ prepared_by: req.query.prepared_by });
    const allProjects = await Project.find({});
    let accessFilteredProjects = allProjects.filter(project => project.access_to.includes(req.query.id));
  
    let collectedProjects = [...projectsByManger, ...accessFilteredProjects];
    console.log("COLLECTED PROJECTS: ", collectedProjects);
    res.send(collectedProjects);
} catch (error) {
  console.log(error);
}

  // Project.find({ prepared_by: req.query.prepared_by })
  //   // .populate("temp_id", "ttype")
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

// get all projects for admin
const getAllProjectsForAdmin = (req, res) => {
  Project.find({})
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  })
}

// edit project access
const editProjectAccess = async (req, res) => {
  const { projectId, userId } = req.body;
  try {
    if(!projectId || !ObjectId.isValid(projectId)) {
      return res.status(404).json({ message: "No timeline Exists" });
    }
    let existedProject = await Project.findById(projectId);
    if(!existedProject) {
      res.status(404).json({message: "Project does not exists"});
    }
    if(!existedProject.access_to.includes(userId)) {
      existedProject.access_to.push(userId);
      await existedProject.save();
      res.status(200).json({message: "Access granted to user"});
    } else {
      res.status(208).json({message: "User has already access to the project"});
    }
  } catch (error) {
      console.error('Error updating project access:', error.message);
  }
}

// get all projects by template
const getAllProjectByResource = (req, res) => {
  // Project.find({ access_to: req.query.resource_name })
  Project.find({ access_to: req.query.id })
    // .populate("temp_id", "ttype")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// get all projects by specific user
const getAllProjectByUSer = (req, res) => {
  Project.find()
    .populate("resource_name", "username")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
// get single project

const getProjectById = (req, res) => {
  Project.findById(req.params.id).populate({ path: 'timelines',populate:{path:'costing',model:'Costing'} })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(404).send({ message: "Project not found" });
      console.log(err);
    });
};

// get all projects whose status have completed of specific template i.e. vteams
const getAllProjectByStatusVC = (req, res) => {
  Project.find({
    proj_status: "Completed",
    temp_id: "6395ded86d71e15926fbbdc1",
  })
    .count()
    .then((result) => {
      res.send(result.toString());
    })
    .catch((err) => {
      console.log(err);
    });
};
// get all projects whose status have pending of specific template i.e. vteams
const getAllProjectByStatusVP = (req, res) => {
  Project.find({
    proj_status: "Pending for Review",
    temp_id: "6395ded86d71e15926fbbdc1",
  })
    .count()
    .then((result) => {
      res.send(result.toString());
    })
    .catch((err) => {
      console.log(err);
    });
};
// get all projects whose status have draft of specific template i.e. vteams
const getAllProjectByStatusVD = (req, res) => {
  Project.find({
    proj_status: "Draft",
    temp_id: "6395ded86d71e15926fbbdc1",
  })
    .count()
    .then((result) => {
      res.send(result.toString());
    })
    .catch((err) => {
      console.log(err);
    });
};
// get all projects whose status have completed of specific template i.e. vteams
const getAllProjectByStatusNC = (req, res) => {
  Project.find({
    proj_status: "Completed",
    temp_id: "6395df75a9038f587df95185",
  })
    .count()
    .then((result) => {
      res.send(result.toString());
    })
    .catch((err) => {
      console.log(err);
    });
};
// get all projects whose status have pending of specific template i.e. vteams


const getAllProjectByStatusNP = (req, res) => {
  Project.find({
    proj_status: "Pending for Review",
    temp_id: "6395df75a9038f587df95185",
  })
    .count()
    .then((result) => {
      res.send(result.toString());
    })
    .catch((err) => {
      console.log(err);
    });
};
// get all projects whose status have draft of specific template i.e. vteams
const getAllProjectByStatusND = (req, res) => {
  Project.find({
    proj_status: "Draft",
    temp_id: "6395df75a9038f587df95185",
  })
    .count()
    .then((result) => {
      res.send(result.toString());
    })
    .catch((err) => {
      console.log(err);
    });
};

// delete project

const deleteProject = (req, res) => {
  Project.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
// update project details

const updateProject = (req, res) => {
  Project.findOneAndUpdate(
    { _id: req.query._id },
    { proj_status: req.body.proj_status },
    { new: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
// update project details proj languages

const updateProjecByTags = (req, res) => {
  Project.findOneAndUpdate(
    { proj_name: req.body.proj_name },
    { proj_tags: req.body.proj_tags },
    { new: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
// update project details proj languages

const updateProjecByTerms = (req, res) => {
  Project.findOneAndUpdate(
    { proj_name: req.body.proj_name },
    {
      $set: {
        notes: req.body.notes,
        questions: req.body.questions,
      }
    },
    { new: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
// update project details proj languages

const updateProjectByTemp = (req, res) => {
  Project.findOneAndUpdate(
    { proj_name: req.body.proj_name },
    { temp_id: req.body.temp_id },
    { new: true }
  )
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
//search project on the bais of project tags or project name 02 
const searchProjectsByTags = (req, res) => {
  Project.find({
    $or: [
      { proj_name: req.query.proj_name },
      { proj_tags: { $in: [req.query.proj_tags] } },
    ],
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// sort
const AscProjects = (req, res) => {
  Project.find({
    $or: [
      { resource_name: req.query.resource_name },
      { prepared_by: req.query.prepared_by },
    ],
  })
    .sort({ created_date: 1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
// sort by vteams
const ProjectSortByV = (req, res) => {
  Project.find({
    $and: [
      { temp_id: "6395ded86d71e15926fbbdc1" },
      {
        $or: [
          { resource_name: req.query.resource_name },
          { prepared_by: req.query.prepared_by },
        ],
      },
    ],
  })
    .sort()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
// sort by nxb
// const ProjectSortByN = (req, res) => {
//   Project.find({
//     $and: [
//       { temp_id: "6395df75a9038f587df95185" },
//       {
//         $or: [
//           { resource_name: req.query.resource_name },
//           { prepared_by: req.query.prepared_by },
//         ],
//       },
//     ],
//   })
//     .sort()
//     .then((result) => {
//       res.status(200).json(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

const ProjectSortByN = (req, res) => {
  Project.find({
    $and: [
      { temp_id: "6395df75a9038f587df95185" },
      {
        $or: [
          { resource_name: req.query.resource_name },
          { prepared_by: req.query.prepared_by },
        ],
      },
    ],
  })
    .sort()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
const DescProjects = (req, res) => {
  Project.find({ prepared_by: req.query.prepared_by })
    // Project.find({
    //   $or: [
    //     { resource_name: req.query.resource_name },
    //     { prepared_by: req.query.prepared_by },
    //   ],
    // })
    .sort({ created_date: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
export {
  addProject,
  getAllProject,
  getAllProjectsForAdmin,
  getAllProjectByResource,
  getAllProjectByUSer,
  getAllProjectByStatusVC,
  getAllProjectByStatusVP,
  getAllProjectByStatusVD,
  getAllProjectByStatusNC,
  getAllProjectByStatusNP,
  getAllProjectByStatusND,
  getProjectById,
  deleteProject,
  updateProject,
  searchProjectsByTags,
  AscProjects,
  DescProjects,
  ProjectSortByV,
  ProjectSortByN,
  updateProjecByTags,
  updateProjecByTerms,
  updateProjectByTemp,
  editProjectAccess
};
