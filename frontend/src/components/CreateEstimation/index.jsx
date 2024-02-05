import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import ProgressBar from "../common/ProgressBar";
import { FormControl, TextField, Button, FormGroup, Box } from "@mui/material";
import SelectIcon from "../../assets/images/select.svg";
import "./Style.scss";
import { useNavigate } from "react-router";
import { newEstimate } from "./services";
import { useSelector } from "react-redux";
import API from "../../utils/api";
import { Field } from 'formik';

const backendURL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";


const CreateEstimation = () => {
  const navigate = useNavigate();
  const [selectVal, setSelectValues] = useState([]);
  const [options, setOptions] = useState('');
  const [selectedUser, setSelectedUser] = useState("nothing");

  const { userInfo } = useSelector(state => state.auth);

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
      const projectCreator = userInfo?.FullName;
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
      navigate(`/timeline/${project.data._id}`)
    },
  });

  useEffect(() => {

    let key = userInfo?.username;
    API.get(`${backendURL}/api/users/resources/?managerName=${key}`)
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
      <section className="nb-section">
        <form onSubmit={formik.handleSubmit}>
          <div className="estimate-container">
            <div className="estimate-form-container">
              <FormControl>
                <label>Title </label>
                <TextField
                  variant="outlined"
                  name="title"
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
                {/* <TextField
                  variant="outlined"
                  name="clientName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.clientName}
                  helperText={formik.touched.clientName && formik?.errors?.clientName}
                  error={!!formik?.errors?.clientName}
                /> */}
                <div className="team-selection">
                  <select
                    id="team"
                    className="team-autocomplete"
                    name="clientName"
                    onChange={formik.handleChange}
                  >
                    <option value="">Select</option>
                    <option value="v-teams">Vteams</option>
                    <option value="nxb">Nextbridge</option>
                  </select>
                  <img src={SelectIcon} alt="select" />
                </div>
              </FormControl>
              <FormGroup className="estimation-form-group">
                <FormControl>
                  <label>Date</label>
                  <TextField
                    variant="outlined"
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
                    name="version"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.version}
                    helperText={formik.touched.version && formik?.errors?.version}
                    error={!!formik?.errors?.version}
                  />
                </FormControl>
              </FormGroup>
            </div>
            <div className="description">
              <FormControl>
                <label className="description-label">Project Description</label>
                <textarea
                  name="description"
                  cols="39"
                  rows="16"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                ></textarea>
                {(formik.touched.description && formik?.errors.description) && <span className="description-error">{formik?.errors.description}</span>}
              </FormControl>
            </div>
          </div>
          <Box className="estimate-btns-container">
            <Button
              to="/"
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
            >
              Send Invite
            </Button>
          </Box>
        </form>
      </section>
      <Footer />
    </>
  );
};

export default CreateEstimation;
