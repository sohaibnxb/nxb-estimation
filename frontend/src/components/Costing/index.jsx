import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import ProgressBar from "../common/ProgressBar";
import {
  FormControl,
  TextField,
  Button,
  Card,
} from "@mui/material";
import { toast } from 'react-toastify';
import { useFormik } from "formik";


import "./Style.scss";
import API from "../../utils/api";

const backendURL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";

const Costing = () => {

  const navigate = useNavigate();
  const { timelines, } = useSelector(state => state.timeline);

  const timelinesDataForCosting = timelines?.map(timeline => ({
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
      data: timelinesDataForCosting
    },
    onSubmit: async (values) => {
      const { status, message } = checkHourlyRate(values.data);
      if(status) {
        try {
          const costs = await API.post(`${backendURL}/api/costing/`, { costings: values.data })
          if (costs) {
            navigate("/languages");
          }
        } catch (error) {
          console.log("error", error);
        }
      } else {
        toast.error(message);
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

  const checkHourlyRate = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].hourRate === null) {
        return { status: false, message: 'Please add hourly rate'};
      }
    }
    return { status: true, message: ''};
  }

  const handleChange = (e, index) => {
    const { value } = e.target;

    const updatedData = [...formik.values.data];
    updatedData[index] = { ...updatedData[index], hourRate: value };
    updatedData[index] = { ...updatedData[index], totalCost: (value * updatedData[index].totalHours) };
    formik.setValues({ ...formik.values, data: updatedData });
  }


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
                <tr key={index}>
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
        <div className="estimate-btns-container">
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