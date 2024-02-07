import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/Auth/SignIn";
import CreateEstimation from "./components/CreateEstimation";
import Costing from "./components/Costing";
import Languages from "./components/Languages";
import Timeline from "./components/timeline";

import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//css
import "./index.scss";
import PdfTemplate from "./components/PdfTemplate";
import { history } from "./utils/api";
import PrivateRoutes from "./utils/PrivateRoutes";
function App() {
  history.navigate = useNavigate()
  history.location = useLocation()
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/new" element={<CreateEstimation />}></Route>
          <Route path="/costing" element={<Costing />}></Route>
          <Route path="/languages" element={<Languages />}></Route>
          <Route path="/timeline/:id" element={<Timeline />}></Route>
        </Route>
        <Route path="/test" element={<PdfTemplate />} />
        <Route path="/signin" element={<SignIn />}></Route>
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
