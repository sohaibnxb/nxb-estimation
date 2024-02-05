import { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from "@mui/material";

import { getRole, getProjectsByManager, getProjectsByResource, getVteamsProjects, getNxbProjects, getRecentProjects, getAllProjects } from "../../redux/dashboardActions";

import SearchIcon from "../../../../assets/images/search.svg";
import SelectIcon from "../../../../assets/images/select.svg";

const EstimatesHistory = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const { projects, role, loading } = useSelector(state => state.dashboard)
  const { userInfo } = useSelector(state => state.auth)

  const { username, FullName, id } = userInfo;

  const dispatch = useDispatch()

  const handleSelected = async (event) => {
    var selectedVal = event.target.value;
    if (selectedVal === "Vteams") {
      dispatch(getVteamsProjects())
    }
    else if (selectedVal === "Nextbridge") {
      dispatch(getNxbProjects())
    }
    else if (selectedVal === "RecentlyAdded") {
      dispatch(getRecentProjects(FullName))
    } else {
      console.log("no data");
    }
  };

  const handleSearchInputChange = (event) => {
    setInputSearch(event.target.value);
  };

  // Projects Search
  useEffect(() => {
    if (inputSearch === '') {
      setSearchResults(projects);
    }
    else {
      const results = projects.filter((item) =>
        item.proj_name.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [inputSearch, projects]);

  useEffect(() => {

    const fetchData = () => {
      if (role === 'manager') {
        dispatch(getProjectsByManager({ FullName, id }));
      }
      else if (role === 'resource') {
        const userData = { FullName, id };
        dispatch(getProjectsByResource(userData));
      }
      else if (role === "admin") {
        dispatch(getAllProjects(role));
      }
      else {
        console.log("No Projects Found");
      }
    }

    fetchData()
  }, [role, username, FullName, dispatch, id]);


  useEffect(() => {
    dispatch(getRole(username))
    // dispatch(getNotifications(username))
  }, [])

  return (
    <>
      <div className="nb-estimatesHistory-wrapper">
        {/* Header */}
        <div className="nb-estimatesHistory-header">
          <div className="main-title">
            <h5>ESTIMATES</h5>
          </div>
          <div className="nb-action-wrapper">
            {/* search box */}
            <div className="search-box">
              <input
                type="text"
                value={inputSearch}
                placeholder="Search By"
                className="search-input"
                onChange={handleSearchInputChange}
              />
              <img src={SearchIcon} alt="search" />
            </div>

            <div className="sort-box">
              {/* sort data */}
              <select
                id="sort"
                onChange={handleSelected}
                className="sort-autocomplete"
              >
                <option value="DEFAULT">Sort By:</option>
                <option value="Vteams">Vteams</option>
                <option value="Nextbridge">Nextbridge</option>
                <option value="RecentlyAdded">Recently Added</option>
              </select>
              <img src={SelectIcon} alt="select" />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="circular-progress">
            <CircularProgress />
          </div>
        ) : (
          searchResults?.map((project) => (
            <div className="nb-estimatesHistory-content" key={project._id}>
              <div className="calender-wrapper">
                <div className="date-box">

                  <span>{moment(project?.created_date).format("DD")}</span>
                </div>
                <div className="monthYear-box">
                  <span>{moment(project?.created_date).format("MMM YY")}</span>
                </div>
              </div>
              <div className="project-meta">
                <span>PROPOSAL FOR</span>
                <h5>
                  <Link to={`/timeline/${project._id}`} >
                    {project?.proj_name}
                  </Link>
                </h5>
                <span>PREPARED BY</span>
                <p>{project?.prepared_by}</p>
              </div>
              <div className="prog-lang">
                {project?.proj_tags.map((tag, index) => {
                  return (
                    <div className="lang-box" key={index}>
                      <span>{tag}</span>
                    </div>
                  )
                })}
              </div>
              <div className="proj-status">
                <div className="status-box" key={project._id}>
                  <span>{project?.proj_status}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default EstimatesHistory;