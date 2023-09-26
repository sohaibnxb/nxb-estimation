import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, CircularProgress } from "@mui/material";
import SelectIcon from "../../../assets/images/select.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import TableRows from "./TableRows";
import TimelineTable from "./TimlineTable";

import { getProjectDetails } from "../redux/timelineActions";

import addIcon from "../../../assets/images/add.svg"
import { addTimeline, deleteTimeline } from "../redux/timelineSllice";

const backendURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";


const Timelinecontent = () => {
  const [estimatedMode, setEstimatedMode] = useState(["Hours", "Days"]);
  const [timelineTables, setTimelineTables] = useState([])

  const [totalHours, setTotalHours] = useState()

  const { id } = useParams();
  const dispatch = useDispatch();
  const { timelines, loading } = useSelector(state => state.timeline)
  const { role } = useSelector(state => state.dashboard)

  const navigate = useNavigate();

  // screens added with estimates in screen schema
  // async function addScreenNotify() {
  //   console.log(rowsData, 'addScreenNotifyfunction');
  //   if (rowsData) {

  //     const projectEstimation = await axios.get(`${backendURL}/api/screens/screen?project_id=${id}`)
  //       .then((response) => {
  //         console.log(response.data);
  //         return response.data
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     console.log("projectEstimation", projectEstimation);

  //     if (projectEstimation === '') {
  //       await toast.promise(axios.post(`${backendURL}/api/screens/${id}`, { rowsData }), {
  //         pending: 'Creating new screen',
  //         success: 'New Screen created successfully',
  //         error: 'Error in creating new screen'
  //       })
  //         .then((response) => {
  //           console.log(response.data);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //     else {
  //       await toast.promise(axios.put(`${backendURL}/api/screens/${id}`, {
  //         project_id: id,
  //         screens: rowsData,
  //       }), {
  //         pending: 'Updating new screen',
  //         success: 'Update screen estimation successfully',
  //         error: 'Error in updating new screen'
  //       })
  //         .then((response) => {
  //           console.log(response.data);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //     // Notification send it to manager
  //     // var key = localStorage.getItem("username");
  //     // var projKey = localStorage.getItem("projName");
  //     // var managerKey = localStorage.getItem("managerName");
  //     await toast.promise(axios.post(
  //       `${backendURL}/api/notifications/?senderName=${username}&receiptName=${managerName}&projectName=${project?.proj_name}&read=false&count=1`
  //     ), {
  //       pending: 'Sending notification',
  //       success: 'Notification sent successfully to your manager',
  //       error: 'Error in sending notifications'
  //     })
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     //receiptant read notification
  //     // const projN = localStorage.getItem("projName");
  //     await axios
  //       .put(`${backendURL}/api/notifications/?projectName=${project?.proj_name}`, {
  //         read: true,
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     // project status change
  //     await axios
  //       .put(`${backendURL}/api/projects/?_id=${id}`, {
  //         proj_status: "Ready for Review",
  //       })
  //       .then((res) => {
  //         console.log(res.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }

  // screens added with estimates in screen schema and project status changed as draft
  // function savedAsDraft() {

  //   // if (rowsData != "") {
  //   //   axios
  //   //     .post(`${backendURL}/api/screens/${id}`, { rowsData })
  //   //     .then((response) => {
  //   //       console.log(response.data);
  //   //       alert("New Screen created successfully");

  //   //     })
  //   //     .catch((error) => {
  //   //       console.log(error);
  //   //     });
  //   // }
  //   // // project status change
  //   // axios
  //   //   .put(`${backendURL}/api/projects/?_id=${id}`, {
  //   //     proj_status: "Draft",
  //   //   })
  //   //   .then((res) => {
  //   //     console.log(res.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });
  // }

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

  const updateTotalHours = (updatedValue) => {
    setTotalHours(updatedValue)
  }

  // function navigatePage() {
  //   console.log('navigate hours', totalHours)
  //   if (rowsData !== "") {
  //     return navigate("/costing", { state: totalHours });

  //   } else {
  //     alert("please fill the estimate");
  //   }
  // }

  function navigatePageD() {
    return navigate("/dashboard");
  }



  // Submit Timelines
  async function handleTimelinesSubmit() {
    const submittedTimelines = await axios.post(`${backendURL}/api/screens/${id}`, {
      timelines: timelines
    })
      .then((response) => {
        console.log(response.data);
        navigate("/costing", { state: totalHours });
        return response.data
      })
      .catch((error) => {
        console.log(error);
      });
  }


  // Api
  useEffect(() => {
    dispatch(getProjectDetails(id))
    setTimelineTables([<TimelineTable />])

  }, [id]);

  useEffect(() => {
    if (timelines.length === 0) {
      dispatch(addTimeline({ projectId: id }));
    }
  }, [timelines]);

  const handleAddTimeline = () => {
    dispatch(addTimeline({ projectId: id }));
  };
  const handleDeleteTimeline = (timelineId) => {
    dispatch(deleteTimeline(timelineId));
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
                    timelines?.map((timeline) => <TimelineTable key={timeline._id} timeline={timeline} totalHours={totalHours} updateTotalHours={updateTotalHours} />)
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
                      <li className="active" key={timeline._id}>
                        {timeline.timelineTitle || 'Timeline Title'}
                        <div div className="action-btns" >
                          {/* <button>
                            <i className="fas fa-edit"></i>
                          </button> */}
                          <button onClick={() => handleDeleteTimeline(timeline._id)}>
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </li>
                    ))}

                  </ul>
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
                </CardContent>
              </Card>
            </div>
          </div>
          <div container className="estimate-btns-container">
            <Button
              variant="contained"
              className="secondary-btn estimate-nav-btn"
              onClick={() => navigate("/dashboard")}
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
            {role === "manager" ? (
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
    </>
  );
};

export default Timelinecontent;
