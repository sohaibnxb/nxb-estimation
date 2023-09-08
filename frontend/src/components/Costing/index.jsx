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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      hours: projectHourRate ? projectHourRate : '',
    },
    onSubmit: async (values) => {
      const hours = parseInt(values.hours);
      let projName = project?.proj_name;
      debugger
      let totalcost = hours * state;
      let payload = { projName, hours, state, totalcost };
      const projectCostExist = await axios.get(`${backendURL}/api/costing/project?projectName=${projName}`)
        .then((response) => {
          console.log('projectCostExist', response.data);
          return response.data
        })
        .catch((error) => {
          console.log(error);
        });
      debugger
      if (projectCostExist.length == 0) {
        const postReq = await toast.promise(
          axios.post(`${backendURL}/api/costing/?totalHours=${state}&hourRate=${hours}&totalCost=${totalcost}&projectName=${projName}`),
          {
            pending: 'Adding Project Costing',
            success: 'Costing added successfully',
            error: 'Error adding project costing'
          }
        )
          .then((response) => {
            console.log(response.data);
            navigate("/languages");
          })
          .catch((error) => {
            console.log(error);
          });
      }
      else {
        debugger
        const putReq = await toast.promise(
          axios.put(`${backendURL}/api/costing/id`, {
            projectName: projName,
            totalHours: state,
            hourRate: hours,
            totalCost: totalcost,
          }),
          {
            pending: 'Updating Project Costing',
            success: 'Costing updated successfully',
            error: 'Error updating project costing'
          }
        )
          .then((response) => {
            navigate("/languages");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    validate: async (values) => {
      let errors = {};
      if (!values.hours) {
        errors.hours = "Required";
      }
      return errors;
    },
  });


  // Load the cost of project if project exists
  useLayoutEffect(() => {

    async function fetchProjectCosting() {
      const projectCost = await axios.get(`${backendURL}/api/costing/project?projectName=${project?.proj_name}`);
      if (projectCost) {
        console.log('first', projectCost);
        const hourRate = parseInt(projectCost.data[0]?.hourRate)
        setProjectHourRate(hourRate)
      }
      // projectCost()
    }
    fetchProjectCosting()
  }
    , [])
  return (
    <>
      <Topbar estimate={false} limiteRole={false} />
      <ProgressBar steps={3} />
      <form onSubmit={formik.handleSubmit}>
        <Card className="costing-card">
          <h5 className="costing-sub-title">TOTAL COST OF YOUR PROJECT</h5>
          <h2 className="costing-title">
            <span>$</span> {formik.values.hours * state}
          </h2>

          <table className="costing-table">
            <tr>
              <th className="text-left bl-0">Services</th>
              <th>Rate</th>
              <th>Hour</th>
              <th className="br-0">Cost</th>
            </tr>
            <tr>
              <td>{project?.proj_name}</td>
              <td>
                <FormControl>
                  <TextField
                    variant="outlined"
                    placeholder="0"
                    name="hours"
                    onChange={formik.handleChange}
                    value={formik.values.hours}
                    type="number"
                    inputProps={{ min: 0 }}
                  />
                </FormControl>
                / hours
              </td>
              <td> {state}</td>
              <td>$ {formik.values.hours * state}</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-right text-bold">
                Total
              </td>
              <td className="text-bold">$ {formik.values.hours * state}</td>
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
