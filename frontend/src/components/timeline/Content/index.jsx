import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import TimelineTable from "./TimlineTable";

import { getProjectDetails, submitTimelines } from "../redux/timelineActions";

import { addTimeline, deleteTimeline } from "../redux/timelineSllice";
import InviteUserModal from "../../common/InviteUserModal";
import API from "../../../utils/api";

const backendURL = 'http://10.28.81.105:5000' || "http://localhost:5000";

const Timelinecontent = () => {
  const [estimatedMode, setEstimatedMode] = useState(["Hours", "Days"]);
  const [timelineTables, setTimelineTables] = useState([]);
  const [inviteModal, setInviteModal] = useState(false);
  const toggleInviteModal = (timelineId) => {
    setBackendId(timelineId);
    setInviteModal(prevState => !prevState)
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const { timelines, loading, project, projectOwner } = useSelector(state => state.timeline);
  const { role } = useSelector(state => state.dashboard);

  const { userInfo } = useSelector(state => state.auth)
  const { id: userID, FullName } = userInfo
  const navigate = useNavigate();

  // select option
  estimatedMode.map((estimateOption) => estimateOption);

  // Hanle Estimate Type
  const handleOptionChange = (e) => {
    var selectedOption = estimatedMode[e.target.value];
    console.log("selectedOption", selectedOption);
    if (selectedOption === "Hours") {
      console.log(selectedOption);
    }
  };

  // useEffect(() => {
  //   const projectId = project._id;
  //   getTimelines(projectId);
  // }, [timelines]);

  // function navigatePage() {
  //   if (rowsData !== "") {
  //     return navigate("/costing", { state: totalHours });

  //   } else {
  //     alert("please fill the estimate");
  //   }
  // }

  function navigatePageD() {
    let { status, message } = validateTimelines(timelines);
    if (status) {
      dispatch(submitTimelines(timelines)).then((res) => console.log(res));
      return navigate("/");
    } else {
      toast.error(message);
    }
  }

  // Submit Timelines
  async function handleTimelinesSubmit() {
    let { status, message } = validateTimelines(timelines);
    if (status) {
      console.log("TIMELINES: ", timelines);
      dispatch(submitTimelines(timelines)).then((res) => navigate('/costing'));
    } else {
      toast.error(message);
    }
  }

  // to validate timeline form
  const validateTimelines = (timelineData) => {
    console.log(timelineData);
    for (const timeline of timelineData) {
        if (!timeline.timelineTitle) {
            return { status: false, message: 'Please add timeline title' };
        }

        // Check items array
        if (timeline.items.length) {
            for (const item of timeline.items) {
                if (!item.itemName) {
                    return { status: false, message: 'Please add timeline item name' };
                }
                if (!item.hours) {
                    return { status: false, message: 'Please add estimation hours' };
                }

                // Check subItems array
                if (item.subItems && item.subItems.length > 0) {
                    for (const subItem of item.subItems) {
                        if (!subItem.trim()) {
                            return { status: false, message: 'Please add valid subItem name' };
                        }
                    }
                }
            }
        } else {
            return { status: false, message: 'Please add items in the timeline' };
        }
    }
    return { status: true, message: '' };
  };

  // Api
  useEffect(() => {
    let idsData = { id, userID, FullName, role };
    dispatch(getProjectDetails(idsData));
    setTimelineTables([<TimelineTable />]);
  }, [id]);

  useEffect(() => {
    if (timelines?.length === 0) {
      dispatch(addTimeline({ projectId: id }));
    }
  }, [timelines]);

  const handleAddTimeline = () => {
    dispatch(addTimeline({ projectId: id }));
  };

  const handleDeleteTimeline = (timelineId) => {
    dispatch(deleteTimeline(timelineId));
  };

  // Confirmation Modal
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [backendId, setBackendId] = useState(null);

  const handleDeleteClick = (frontendId, backendId, event) => {
    setSelectedId(frontendId);
    setBackendId(backendId)
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDeleteConfirmed = () => {
    dispatch(deleteTimeline(selectedId));
    setDialogOpen(false);
  };

  return (
    <>
      <section className="nb-section">
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="nb-dashboard-title text-center">
            <p>
              The modules below are created as per your requirements. Please
              review following modules and timeline.
            </p>
          </div >
          <div className="main_content">
            <div className="main_content--left">
              {loading ? (
                <div className="circular-progress">
                  < CircularProgress />
                </div>

              ) : (
                <div className="nb-innertimeline-wrapper">
                  {timelines?.length > 0 ? (
                    timelines?.map((timeline) => <TimelineTable key={timeline.id} timeline={timeline} />)
                  ) : null
                  }
                </div>
              )}

            </div>

            <div className="main_content--right">
              <Card className="card-padding">
                <CardContent>
                  <ul className="expertise">
                    {timelines?.map((timeline) => (
                      <li className="active" key={timeline.id}>
                        {timeline.timelineTitle || 'Timeline Title'}
                        {
                          role !== "resource" &&
                          <div className="action-btns" >
                            <button onClick={() => toggleInviteModal(timeline._id)}>
                              <i className="fa fa-solid fa-user-plus"></i>
                            </button>
                            <button
                              onClick={(event) => handleDeleteClick(timeline.id, timeline._id, event)}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        }
                      </li>
                    ))}

                  </ul>
                  {
                    projectOwner === FullName &&
                    <div className="add-button"
                      // onClick={() => setTimelineTables(prev => {+++
                      //   return [...prev, <TimelineTable />]
                      // })}
                      onClick={handleAddTimeline}
                    >
                      <svg
                        id="Component_21_4"
                        data-name="Component 21 – 4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        viewBox="0 0 60 60"
                      >
                        <path
                          id="Rectangle_305"
                          data-name="Rectangle 305"
                          d="M0,0H60a0,0,0,0,1,0,0V60a0,0,0,0,1,0,0H8a8,8,0,0,1-8-8V0A0,0,0,0,1,0,0Z"
                          fill="currentColor"
                        />
                        <path
                          id="Path_23"
                          data-name="Path 23"
                          d="M0,0H60V60Z"
                          fill="#fff"
                        />
                        <g
                          id="Group_322"
                          data-name="Group 322"
                          transform="translate(-1751.5 -684.5)"
                        >
                          <line
                            id="Line_161"
                            data-name="Line 161"
                            x2="16"
                            transform="translate(1761.5 726.5)"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2.5"
                          />
                          <line
                            id="Line_162"
                            data-name="Line 162"
                            y2="16"
                            transform="translate(1769.5 718.5)"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2.5"
                          />
                        </g>
                      </svg>
                    </div>
                  }
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="estimate-btns-container">
            <Button
              variant="contained"
              className="secondary-btn estimate-nav-btn"
              onClick={() => navigate("/")}
            >
              Back
            </Button>
            <Button
              type="submit"
              // onClick={savedAsDraft}
              variant="contained"
              className="dark-button estimate-nav-btn"
            >
              Save As Draft
            </Button>
            {role === "manager" || role === "admin" ? (
              <Button
                type="sumit"
                onClick={() => {
                  // addScreenNotify();
                  // navigatePage();
                  handleTimelinesSubmit()
                }}
                variant="contained"
                className="secondary-btn estimate-nav-btn"
              >
                Save & Continue
              </Button>
            ) : (
              <Button
                type="sumit"
                onClick={() => {
                  // addScreenNotify();
                  navigatePageD();
                }}
                variant="contained"
                className="secondary-btn estimate-nav-btn"
              >
                Save & Send
              </Button>
            )}
          </div>
        </form >
      </section >

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onDelete={handleDeleteConfirmed}
        id={backendId}
      />

      <InviteUserModal open={inviteModal} toggleOpen={toggleInviteModal} timelineId={backendId} />
    </>
  );
};

export default Timelinecontent;

// eslint-disable-next-line react/prop-types
const ConfirmationDialog = ({ open, onClose, onDelete, id }) => {

  const handleDelete = async () => {
    try {
      await API.delete(`${backendURL}/api/timelines/${id}`);
      onDelete();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Confirm Deletion"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this timeline? <br /> This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: '1rem 1.5rem' }}>
        <Button onClick={onClose} color="inherit" size="small">Cancel</Button>
        <Button onClick={handleDelete} variant="contained" color="error" size="small" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
