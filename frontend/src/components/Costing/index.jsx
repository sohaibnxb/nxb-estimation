import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import { toast } from 'react-toastify';
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import ProgressBar from "../common/ProgressBar";
import {
  FormControl,
  TextField,
  Button,
  Grid,
  Card,
} from "@mui/material";
import { useFormik } from "formik";

import "./Style.scss";

const backendURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const Costing = () => {

  const [projectHourRate, setProjectHourRate] = useState(0)
  const { state } = useLocation();
  const navigate = useNavigate();
  const { project } = useSelector(state => state.timeline)
  const { timelines } = useSelector(state => state.timeline)

  
  const timelinesDataForCosting = timelines.map(timeline => ({
    timelineId: timeline?._id,
    projectId: timeline?.projectId,
    timelineTitle: timeline?.timelineTitle,
    totalHours: timeline?.totalHours,
    hourRate: timeline?.costing?.[0]?.hourRate ?? null,
    totalCost: timeline?.costing?.[0]?.totalCost ?? null,
    _id: timeline?.costing?.[0]?._id ?? null
  }));

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // data: timelinesDataForCosting
      data: timelinesDataForCosting
    },
    onSubmit: async (values) => {

      try {
        const costs = await axios.post(`${backendURL}/api/costing/`, { costings: values.data })
        if (costs) {
          navigate("/languages");
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    validate: async (values) => {
      let errors = {};
      if (!values.data) {
        errors.hours = "Required";
      }
      return errors;
    },
  });
  const handleChange = (e, index) => {
    const { value } = e.target;

    const updatedData = [...formik.values.data];
    updatedData[index] = { ...updatedData[index], hourRate: value };
    updatedData[index] = { ...updatedData[index], totalCost: (value * updatedData[index].totalHours) };
    formik.setValues({ ...formik.values, data: updatedData });
  }

  // Load the cost of project if project exists
  useLayoutEffect(() => {

    // async function fetchProjectCosting() {
    //   const projectCost = await axios.get(`${backendURL}/api/costing/project?projectName=${project?.proj_name}`);
    //   if (projectCost) {
    //     console.log('first', projectCost);
    //     const hourRate = parseInt(projectCost.data[0]?.hourRate)
    //     setProjectHourRate(hourRate)
    //   }
    //   // projectCost()
    // }
    // fetchProjectCosting()
  }
    , [])

  let totalCost = formik.values.data.reduce((total, item) => (total + (item.hourRate * item.totalHours)), 0)
  return (
    <>
      <Topbar estimate={false} limiteRole={false} />
      <ProgressBar steps={3} />
      <form onSubmit={formik.handleSubmit}>
        <Card className="costing-card">
          <h5 className="costing-sub-title">TOTAL COST OF YOUR PROJECT</h5>
          <h2 className="costing-title">
            <span>$</span>{totalCost}
          </h2>

          <table className="costing-table">
            <tr>
              <th className="text-left bl-0">Services</th>
              <th>Rate</th>
              <th>Hour</th>
              <th className="br-0">Cost</th>
            </tr>

            {
              timelinesDataForCosting?.map((timeline, index) => (
                <tr>
                  <td>{timeline?.timelineTitle}</td>
                  <td>
                    <FormControl>
                      <TextField
                        variant="outlined"
                        placeholder="0"
                        name={`${formik.values.data[index].title}`}
                        onChange={(e) => handleChange(e, index)}
                        defaultValue={formik.values.data[index].hourRate}
                        type="number"
                        inputProps={{ min: 0 }}
                      />
                    </FormControl>
                    / hours
                  </td>
                  <td>{timeline?.totalHours}</td>
                  {/* <td>{(timeline?.totalHours * formik.values.data[index].hourRate)}</td> */}
                  <td>{formik.values.data[index].totalCost}</td>
                </tr>
              ))
            }
            <tr>
              <td colSpan={3} className="text-right text-bold">
                Total
              </td>
              <td className="text-bold">${totalCost}</td>
            </tr>
          </table>
        </Card>
        <div container className="estimate-btns-container">
          <Button
            variant="contained"
            className="secondary-btn estimate-nav-btn"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <Button
            variant="contained"
            className="secondary-btn estimate-nav-btn"
            type="submit"
          >
            Next
          </Button>
        </div>
      </form >
      <Footer />
    </>
  );
};

export default Costing;