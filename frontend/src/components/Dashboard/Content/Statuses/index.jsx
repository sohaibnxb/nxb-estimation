import React, { useState, useEffect } from "react";
import axios from "axios";

const Statuses = () => {
  const [completedCount, setCompletedCount] = useState([]);
  const [pendingCount, setPendingCount] = useState([]);
  const [draftCount, setDraftCount] = useState([]);
  const [completedNCount, setCompletedNCount] = useState([]);
  const [pendingNCount, setPendingNCount] = useState([]);
  const [draftNCount, setDraftNCount] = useState([]);
  // const URL = process.env.REACT_APP_SERVER_URL;
  // const backendURL = "http://localhost:5000";
  const backendURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";
  const comp = `${backendURL}/api/projects/comp`;
  const pending = `${backendURL}/api/projects/pending`;
  const draft = `${backendURL}/api/projects/draft`;
  const Ncomp = `${backendURL}/api/projects/Ncomp`;
  const Npending = `${backendURL}/api/projects/Npending`;
  const Ndraft = `${backendURL}/api/projects/Ndraft`;
  useEffect(() => {

    axios.get(comp)
      .then((response) => {
        setCompletedCount(response.data)
      })
      .catch((error) => console.log(error));

    axios.get(pending)
      .then((response) => {
        setPendingCount(response.data)

      })
      .catch((error) => console.log(error));

    axios.get(draft)
      .then((response) => {
        setDraftCount(response.data)
      })
      .catch((error) => console.log(error));

    axios.get(Ncomp)
      .then((response) => {
        setCompletedNCount(response.data)
      })
      .catch((error) => console.log(error));

    axios.get(Npending)
      .then((response) => {
        setPendingNCount(response.data)
      })
      .catch((error) => console.log(error));

    axios.get(Ndraft)
      .then((response) => {
        setDraftNCount(response.data)
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="nb-statuses-wrapper">
        <div className="nb-statuses-header">
          <div className="main-title">
            <h5>STATUSES</h5>
          </div>

          <div className="nb-statuses-content">
            <div className="team-statuses">
              <div className="title">
                <h6>vteams</h6>
              </div>
              <div className="completed-count count">
                <span>{completedCount}</span>
              </div>
              <div className="pending-count count">
                <span>{pendingCount}</span>
              </div>
              <div className="draft-count count">
                <span>{draftCount}</span>
              </div>
            </div>
            <div className="team-statuses">
              <div className="title nxb">
                <h6>Nextbridge</h6>
              </div>
              <div className="completed-count count">
                <span>{completedNCount}</span>
              </div>
              <div className="pending-count count">
                <span>{pendingNCount}</span>
              </div>
              <div className="draft-count count">
                <span>{draftNCount}</span>
              </div>
            </div>
            {/* <div className="team-statuses label-statuses">
              <div className="title">
                
              </div>
              <div className="completed-label count">
                  <p>Completed</p>
              </div>
              <div className="pending-label count">
                <p>Pending for review</p>
              </div>
              <div className="draft-label count">
                <p>Draft</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Statuses;
