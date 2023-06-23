import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import ProgressBar from "../common/ProgressBar";
import { FormControl, TextField, Button, FormGroup, Box } from "@mui/material";
import SelectIcon from "../../assets/images/select.svg";
import "./Style.scss";
import { useNavigate } from "react-router";
import { newEstimate, sendNotification } from "./services";


const CreateEstimation = () => {
  const navigate = useNavigate();
  //const URL = process.env.REACT_APP_SERVER_URL;
  const [selectVal, setSelectValues] = useState([]);
  const [options, setOptions] = useState('');
  const [selectedUser, setSelectedUser] = useState("nothing");
  const [isRead, setIsRead] = useState(false);
  const [totalcount, setTotalCount] = useState(1);
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    proposalType: Yup.string().required("Proposal is required"),
    clientName: Yup.string().required("Client name is required"),
    date: Yup.date().required("Date is required"),
    version: Yup.string().required("Version is required"),
    description: Yup.string().required("Description is required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      proposalType: "",
      clientName: "",
      date: "",
      version: "",
      description: "",
      resource_name: {}
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const title = values.title;
      const proposalType = values.proposalType;
      const clientName = values.clientName;
      const date = values.date;
      const version = values.version;
      const description = values.description;
      const projectCreator = localStorage.getItem("user");
      const preparedby = projectCreator;
      const proj_status = "In progress";
      const project = await newEstimate(
        title,
        proposalType,
        preparedby,
        clientName,
        date,
        version,
        description,
        proj_status,
        selectedUser,
      );
      //console.log("Form Data", values);
      await sendNotification(title, options, isRead, totalcount, navigate);
      navigate(`/timeline/${project.data._id}`)
    },
  });
  //console.log("Form Values", formik.values);
  useEffect(() => {

    var key = localStorage.getItem("username");
    axios
      .get(`http://localhost:5000/api/users/resources/?managerName=${key}`)
      .then((response) => {
        setSelectValues(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (options) {
      setSelectedUser(options);
    }
  }, [options]);

  return (
    <>
      <Topbar estimate={false} limiteRole={false} />
      <ProgressBar steps={1} />
      {/* <section className="nb-section"> */}
        <form onSubmit={formik.handleSubmit}>
          <div className="estimate-container">
            <div className="estimate-form-container">
              <FormControl>
                <label>Title </label>
                <TextField
                  variant="outlined"
                  name="title"
                  // defaultValue="Connectpoint Connect App"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  helperText={formik.touched.title && formik?.errors?.title}
                  error={!!formik?.errors?.title}
                />
              </FormControl>
              <FormControl>
                <label>Proposal Type</label>
                <TextField
                  variant="outlined"
                  // defaultValue="Ui/Ux"
                  name="proposalType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.proposalType}
                  helperText={formik.touched.proposalType && formik?.errors?.proposalType}
                  error={!!formik?.errors?.proposalType}
                />
              </FormControl>
              <FormControl>
                <label>Proposal For</label>
                <TextField
                  variant="outlined"
                  // defaultValue="Client Name"
                  name="clientName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.clientName}
                  helperText={formik.touched.clientName && formik?.errors?.clientName}
                  error={!!formik?.errors?.clientName}
                />
              </FormControl>
              <FormGroup className="estimation-form-group">
                <FormControl>
                  <label>Date</label>
                  <TextField
                    variant="outlined"
                    // defaultValue="2023-05-24"
                    type="date"
                    name="date"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.date}
                    helperText={formik.touched.date && formik?.errors?.date}
                    error={!!formik?.errors?.date}
                  />
                </FormControl>
                <FormControl>
                  <label>Version</label>
                  <TextField
                    variant="outlined"
                    // defaultValue="0.1"
                    name="version"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.version}
                    helperText={formik.touched.version && formik?.errors?.version}
                    error={!!formik?.errors?.version}
                  />
                </FormControl>
              </FormGroup>
              <FormControl>
                <label>Assign Resouces</label>
                <div className="assign-selectbox">
                  {/* sort data */}
                  <select
                    id="assign"
                    name="users"
                    className="assign-resources-selectbox"
                    onChange={(e) => {
                      setOptions(e.target.value);
                    }}
                  >
                    {/* <option>Please Assigned user</option> */}
                    {selectVal.map((opts) => (
                      <option key={opts.username}>{opts.username}</option>
                    ))}
                  </select>
                  <img src={SelectIcon} alt="select" />
                </div>
              </FormControl>
              {/* {options}
            <br />
           {selectedUser} */}
            </div>
            <div className="description">
              <FormControl>
                <label className="description-label">Project Description</label>
                <textarea
                  name="description"
                  cols="39"
                  rows="20"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                // placeholder='Type project description here This app will facilitate client who is running ISP that uses Mikrotik routers. Client will have an application for his users to provide them free internet after watching a video advertisement on same mobile application.'
                ></textarea>
                {(formik.touched.description && formik?.errors.description) && <span className="">{formik?.errors.description}</span>}
              </FormControl>
            </div>
          </div>
          <Box className="estimate-btns-container">
            <Button
              to="/dashboard"
              variant="contained"
              className="secondary-btn estimate-nav-btn"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              className="secondary-btn estimate-nav-btn"
            >
              Next
            </Button>
            <Button
              variant="contained"
              type="submit"
              className="secondary-btn estimate-nav-btn"
              onClick={sendNotification}
            >
              Send Invite
            </Button>
          </Box>
        </form>
      {/* </section> */}
      <Footer />
    </>
  );
};

export default CreateEstimation;
