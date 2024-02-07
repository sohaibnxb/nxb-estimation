import { useState, useEffect } from "react";
import API from "../../../../utils/api";
import { useSelector } from "react-redux";

const Statuses = () => {
  const [completedCount, setCompletedCount] = useState([]);
  const [pendingCount, setPendingCount] = useState([]);
  const [draftCount, setDraftCount] = useState([]);
  const [completedNCount, setCompletedNCount] = useState([]);
  const [pendingNCount, setPendingNCount] = useState([]);
  const [draftNCount, setDraftNCount] = useState([]);
  const backendURL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";
  const comp = `${backendURL}/api/projects/comp`;
  const pending = `${backendURL}/api/projects/pending`;
  const draft = `${backendURL}/api/projects/draft`;
  const Ncomp = `${backendURL}/api/projects/Ncomp`;
  const Npending = `${backendURL}/api/projects/Npending`;
  const Ndraft = `${backendURL}/api/projects/Ndraft`;
  const { projects }  = useSelector(state => state.dashboard);
  const [nxbProjectsCount, setNxbProjectsCount] = useState(0);
  const [vTeamsProjectsCount, setVTeamsProjectsCount] = useState(0);

  useEffect(() => {
    const vTeamsProjects = projects.filter(project => project.team === "v-teams").length;
    const nxbProjects = projects.filter(project => project.team === "nxb").length;
    setNxbProjectsCount(nxbProjects);
    setVTeamsProjectsCount(vTeamsProjects);
  }, [projects]);

  useEffect(() => {

    API.get(comp)
      .then((response) => {
        console.log("COMPLETED: ", response);
        setCompletedCount(response.data)
      })
      .catch((error) => console.log(error));

    API.get(pending)
      .then((response) => {
        console.log("PENDING: ", response);
        setPendingCount(response.data)

      })
      .catch((error) => console.log(error));

    API.get(draft)
      .then((response) => {
        console.log("DRAFT : ", response);
        setDraftCount(response.data)
      })
      .catch((error) => console.log(error));

    API.get(Ncomp)
      .then((response) => {
        setCompletedNCount(response.data)
      })
      .catch((error) => console.log(error));

    API.get(Npending)
      .then((response) => {
        setPendingNCount(response.data)
      })
      .catch((error) => console.log(error));

    API.get(Ndraft)
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
                {/* <span>{completedCount}</span> */}
                <span>{vTeamsProjectsCount}</span>
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
                {/* <span>{completedNCount}</span> */}
                <span>{nxbProjectsCount}</span>
              </div>
              <div className="pending-count count">
                <span>{pendingNCount}</span>
              </div>
              <div className="draft-count count">
                <span>{draftNCount}</span>
              </div>
            </div>
            <div className="team-statuses label-statuses">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statuses;
