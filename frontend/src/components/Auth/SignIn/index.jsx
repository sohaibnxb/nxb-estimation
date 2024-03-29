import { Navigate } from "react-router-dom";
import { useDispatch, useSelector, } from 'react-redux'
import { userLogin } from "./redux/authActions";
import { useFormik } from "formik";
import {
  Box,
  Grid,
  FormControl,
  TextField,
  Button,
  Typography,
} from "@mui/material";
// style
import "./Style.scss";
// images
import illustration from "../../../assets/images/side-img.png";
import Logo from "../../../assets/images/nxb-logo.png";
import { setIsNavigatingToSignIn } from "../../../utils/api";

const SignIn = () => {
  const dispatch = useDispatch()
  const userToken = localStorage.getItem("access-token")
  const { userInfo } = useSelector(state => state.auth)

  const initialValues = {
    username: "",
    password: "",
  };


  setIsNavigatingToSignIn(false);

  const onSubmit = async (values) => {
    dispatch(userLogin(values))
  };

  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)
    ) {
      errors.username = "Invalid email format";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  if (userToken && userInfo) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container className="signIn-wrapper">
          <Grid item xs={4}>
            <div className="side-wrapper">
              <div className="side-content">
                <h3>
                  Better Experience with Estimation Application to Select,
                  Create & Submit
                </h3>
              </div>
              <div className="side-image">
                <img src={illustration} alt="estimation-illustration" />
              </div>
              <div className="logo">
                <p>Powered by</p>
                <img src={Logo} alt="nxb-logo" />
              </div>
            </div>
          </Grid>
          <Grid item xs={8} className="main-wrapper">
            <div className="signIn-container">
              <div className="signIn-title">
                <h4>Sign In to Estimate</h4>
              </div>
              <div className="signIn-form-controls">
                <form onSubmit={formik.handleSubmit}>
                  <FormControl>
                    <label>Username or Email Address</label>
                    <TextField
                      variant="outlined"
                      name="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                    />

                    {formik.touched.username && formik.errors.username ? (
                      <Typography variant="subtitle2">
                        {formik.errors.username}
                      </Typography>
                    ) : null}
                  </FormControl>
                  <FormControl>
                    <label>Password</label>
                    <TextField
                      variant="outlined"
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <Typography variant="subtitle2">
                        {formik.errors.password}
                      </Typography>
                    ) : null}
                  </FormControl>
                  <Box className="action-wrapper">
                    <Button
                      variant="contained"
                      className="dark-button signIn-btn"
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Box>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignIn;