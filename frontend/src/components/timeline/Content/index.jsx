import React, { useEffect, useState } from "react";
import { Button, Card, CardContent } from "@mui/material";
import SelectIcon from "../../../assets/images/select.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import TableRows from "./TableRows";

import { getProjectDetails, getProjectDeliverables } from "../redux/timelineActions";

const Timelinecontent = () => {
  const navigate = useNavigate();
  const [estimatedMode, setEstimatedMode] = useState(["Hours", "Days"]);
  const [rowsData, setRowsData] = useState([]);
  const [rowsExtraData, setRowsExtraData] = useState([]);
  const [showRow, setShowRow] = useState(false);
  const [showExtraRow, setShowExtraRow] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();

  const { project, projectDeliverables } = useSelector(state => state.timeline)

  // add new rows
  const addTableRows = () => {
    const rowsInput = {
      screenName: "",
      hours: "",
      screenSections: []
    };
    setRowsData([...rowsData, rowsInput]);
    setShowRow(true);
  };
  // add sub row
  const addSubRows = (index, subIndex) => {
    var temp = [...rowsData];
    temp[index].screenSections.splice(subIndex + 1, 0, "");
    setRowsData([...temp]);
  };
  // delete rows
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };
  //delete sub rows
  const deleteTableExtraRows = (mainIndex, subIndex) => {
    var temp = [...rowsData];
    temp[mainIndex].screenSections.splice(subIndex, 1);
    setRowsData([...temp]);
  };
  // change input and getting values
  const handleChange = async (index, evnt) => {
    // evnt.preventDefault();
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    console.log("rowsInput", rowsInput);
    setRowsData(rowsInput);
  };
  // change sub input and getting values
  const handleExtraChange = async (mainIndex, subIndex, evnt) => {
    const temp = [...rowsData];
    temp[mainIndex].screenSections[subIndex] = evnt.target.value;
    setRowsData([...temp]);
  };
  // screens added with estimates in screen schema
  async function addScreenNotify() {
    console.log(rowsData, 'addScreenNotifyfunction');
    if (rowsData) {
      // let projectEstimationExist;
      // axios
      //   .get(`http://localhost:5000/api/screens/screen?project_id=${id}`)
      //   .then((response) => {
      //     console.log('id data', response );
      //     projectEstimationExist = response.data
      //   })
      //   .catch((error) => {
      //     console.log("check projectEstimationExist",error);
      //   });
      // console.log("projectEstimationExist", projectEstimationExist);
      const projectEstimation = await axios.get(`http://localhost:5000/api/screens/screen?project_id=${id}`)
        .then((response) => {
          console.log(response.data);
          return response.data
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("projectEstimation", projectEstimation);
      debugger
      if (projectEstimation == "") {

        await toast.promise(axios.post(`http://localhost:5000/api/screens/${id}`, { rowsData }), {
          pending: 'Creating new screen',
          success: 'New Screen created successfully',
          error: 'Error in creating new screen'
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        // alert("if");
      }
      else {
        debugger
        await toast.promise(axios.put(`http://localhost:5000/api/screens/${id}`, {
          project_id: id,
          screens: rowsData,
        }), {
          pending: 'Updating new screen',
          success: 'Update screen estimation successfully',
          error: 'Error in creating new screen'
        })
          .then((response) => {
            console.log(response.data);
            debugger
          })
          .catch((error) => {
            console.log(error);
          });
        // alert("else");
      }
      debugger
      // Notification send it to manager
      var key = localStorage.getItem("username");
      var projKey = localStorage.getItem("projName");
      var managerKey = localStorage.getItem("managerName");
      await toast.promise(axios.post(
        `http://localhost:5000/api/notifications/?senderName=${key}&receiptName=${managerKey}&projectName=${projKey}&read=false&count=1`
      ), {
        pending: 'Sending notification',
        success: 'Notification sent successfully to your manager',
        error: 'Error in sending notifications'
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      debugger
      //receiptant read notification
      const projN = localStorage.getItem("projName");
      axios
        .put(`http://localhost:5000/api/notifications/?projectName=${projN}`, {
          read: true,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      debugger
      // project status change
      axios
        .put(`http://localhost:5000/api/projects/?_id=${id}`, {
          proj_status: "Ready for Review",
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  // screens added with estimates in screen schema and project status changed as draft
  function savedAsDraft() {

    // if (rowsData != "") {
    //   axios
    //     .post(`http://localhost:5000/api/screens/${id}`, { rowsData })
    //     .then((response) => {
    //       console.log(response.data);
    //       alert("New Screen created successfully");

    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    // // project status change
    // axios
    //   .put(`http://localhost:5000/api/projects/?_id=${id}`, {
    //     proj_status: "Draft",
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
  // total sum
  var totalHours = rowsData?.reduce((total, item) => (total + (item.hours ? parseInt(item.hours) : 0)), 0);
  // select option
  estimatedMode.map((estimateOption) => estimateOption);

  const handleOptionChange = (e) => {
    var selectedOption = estimatedMode[e.target.value];
    console.log("selectedOption", selectedOption);
    if (selectedOption == "Hours") {
      console.log(selectedOption);
    }
  };

  function navigatePage() {
    console.log('navigate hours', totalHours)
    if (rowsData !== "") {
      return navigate("/costing", { state: totalHours });

    } else {
      alert("please fill the estimate");
    }
  }

  function navigatePageD() {
    return navigate("/dashboard");
  }
  // Api
  useEffect(() => {
    console.log(id);
    // axios
    //   .get(`http://localhost:5000/api/projects/${id}`)
    //   .then((res) => {
    //     setProjectDetails([res.data]);
    //     console.log([res.data.proj_name]);
    //     localStorage.setItem("projName", res.data.proj_name);
    //     localStorage.setItem("projId", res.data._id);
    //     //console.log(res.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    dispatch(getProjectDetails(id))
    // debugger
    // if timeline is already done then import data
    const projectScreens = axios
      .get(`http://localhost:5000/api/screens/screen?project_id=${id}`)
      .then((response) => {
        setRowsData(response.data.screens)
      })
      .catch((error) => {
        console.log(error);
      });

    localStorage.setItem("projName", project?.proj_name);
    localStorage.setItem("projId", project?._id);

  }, [id]);


  return (
    <>
      <section className="nb-section">
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="nb-dashboard-title text-center">
            <p>
              The modules below are created as per your requirements. Please
              review following modules and timeline.
            </p>
          </div>
          <div className="main_content">
            <div className="main_content--left">
              <div className="nb-innertimeline-wrapper">
                <table className="table estimation-table">
                  <thead>
                    <tr>
                      <th>{project?.proj_type}</th>
                      <th>
                        <div className="assign-selectbox select-timeMode">
                          <select
                            id="timeMode"
                            name="users"
                            className="assign-resources-selectbox est-timeMode-selectbox"
                            onChange={(e) => handleOptionChange(e)}
                          >
                            {estimatedMode.map((option, key) => (
                              <option key={key} value={key}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <img src={SelectIcon} alt="select" />
                        </div>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  {rowsData == "" ? (
                    <tbody>
                      {showRow ? (
                        " "
                      ) : (
                        <p onClick={addTableRows}>
                          Type here and enter your estimate
                        </p>
                      )}
                      <TableRows
                        rowsData={rowsData}
                        rowsExtraData={rowsExtraData}
                        deleteTableRows={deleteTableRows}
                        handleChange={handleChange}
                        handleExtraChange={handleExtraChange}
                        addSubRows={addSubRows}
                        showExtraRow={showExtraRow}
                        addTableRows={addTableRows}
                        deleteTableExtraRows={deleteTableExtraRows}
                      />
                      {showRow ? (
                        <>
                          <tr className="totalRow">
                            <td>Total</td>
                            <td>{totalHours}</td>
                            <td></td>
                          </tr>
                          <Button onClick={addTableRows} className="AddRow">
                            Add new Row
                          </Button>
                        </>
                      ) : (
                        " "
                      )}
                    </tbody>
                  ) : (

                    <tbody>
                      <TableRows
                        rowsData={rowsData}
                        rowsExtraData={rowsExtraData}
                        deleteTableRows={deleteTableRows}
                        handleChange={handleChange}
                        handleExtraChange={handleExtraChange}
                        addSubRows={addSubRows}
                        showExtraRow={showExtraRow}
                        addTableRows={addTableRows}
                        deleteTableExtraRows={deleteTableExtraRows}
                      />
                      {
                        <>
                          <tr className="totalRow">
                            <td>Total</td>
                            <td>{totalHours}</td>
                            <td></td>
                          </tr>
                          <Button onClick={addTableRows} className="AddRow">
                            Add new Row
                          </Button>
                        </>
                      }
                    </tbody>
                  )}
                </table>
              </div>
            </div>

            <div className="main_content--right">
              <Card className="card-padding">
                <CardContent>
                  <ul className="expertise">
                    <li className="active">
                      {project?.proj_name}
                      <div className="action-btns">
                        <span>
                          <i className="fas fa-edit"></i>
                        </span>
                        <span>
                          <i className="fas fa-times"></i>
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div className="add-button">
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
              onClick={savedAsDraft}
              variant="contained"
              className="dark-button estimate-nav-btn"
            >
              Save As Draft
            </Button>
            {localStorage.getItem("roleName") === "manager" ? (
              <Button
                type="sumit"
                onClick={() => {
                  addScreenNotify();
                  navigatePage();
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
                  addScreenNotify();
                  navigatePageD();
                }}
                variant="contained"
                className="secondary-btn estimate-nav-btn"
              >
                Save & Send
              </Button>
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default Timelinecontent;
