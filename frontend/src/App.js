import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/Auth/SignIn";
import CreateEstimation from "./components/CreateEstimation";
import Costing from "./components/Costing";
import Languages from "./components/Languages";
import Timeline from "./components/timeline";

import jwt from 'jwt-decode'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//css
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const checkUserToken = () => {
  //   const userToken = localStorage.getItem("access-token");
  //   const token = JSON.parse(userToken);
  //   // console.log(token);
  //   if (!token) {
  //     setIsLoggedIn(false);
  //   }
  //   setIsLoggedIn(true);
  // };
  // useEffect(() => {
  //   checkUserToken();
  // }, [isLoggedIn]);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userToken = localStorage.getItem("access-token")
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const initialValues = {
    username: "",
    password: "",
  };

  // useEffect(() => {
  //   if (userInfo && userToken) {
  //     navigate('/dashboard')
  //   }
  // }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/new" element={<CreateEstimation />}></Route>
        <Route path="/costing" element={<Costing />}></Route>
        <Route path="/languages" element={<Languages />}></Route>
        {/* <Route path="/timeline" element={<Timeline />}></Route> */}
        <Route path="/timeline/:id" element={<Timeline />}></Route>
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        draggable
        theme="light" />
    </>
  );
}

export default App;
const NotFoundpage = () => <h1>Page Not Found</h1>;
