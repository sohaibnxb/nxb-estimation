import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { userData } from "./services";
import SearchIcon from "../../../../assets/images/search.svg";
import SelectIcon from "../../../../assets/images/select.svg";

const EstimatesHistory = () => {
  const [projList, setProjList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async () => {
    var key = inputSearch;
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/projects/search/?proj_name=${key}&proj_tags=${key}`)
      .then((response) => {
        setProjList(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSelected = async (event) => {
    var selectedVal = event.target.value;
    let user = localStorage.getItem("user");
    if (selectedVal === "Vteams") {
      console.log(selectedVal);
      axios
        .get("http://localhost:5000/api/projects/Vsort")
        .then((response) => {
          setProjList(response.data);
          console.log("res from vteams", response.data);
        })
        .catch((error) => console.log(error));
    } else if (selectedVal === "Nextbridge") {
      axios
        .get("http://localhost:5000/api/projects/Nsort")
        .then((response) => {
          setProjList(response.data);
          console.log("res from nxb", response.data);
        })
        .catch((error) => console.log(error));
    } else if (selectedVal === "RecentlyAdded") {

      axios
        .get(`http://localhost:5000/api/projects/dsort?prepared_by=${user}`)
        .then((response) => {
          setProjList(response.data);
          console.log("res from recent", response.data);

        })
        .catch((error) => console.log(error));
    } else {
      console.log("no data");
    }
  };
  const handleEditEstimate = async (_id) => {
    console.log(_id);
  }

  const handleSearchInputChange = (event) => {
    setInputSearch(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await userData()
      let key = localStorage.getItem("roleName");
      let user = localStorage.getItem("user");

      if (key === 'manager') {
        axios
          .get(`http://localhost:5000/api/projects/?prepared_by=${user}`)
          .then((response) => {
            setProjList(response.data)
          })
          .catch((error) => console.log(error))
          .finally(setIsLoading(false));
      } else if (key === 'resource') {
        var userName = localStorage.getItem("username");
        axios
          .get(`http://localhost:5000/api/projects/resource/?resource_name=${userName}`)
          .then((response) => {
            setProjList(response.data)
            console.log("Get projects by resource name", response.data);
          })
          .catch((error) => console.log(error))
          .finally(setIsLoading(false));
      } else {
        console.log('no projects found');
      }
    }
    fetchData()
  }, []);

  useEffect(() => {
    if (inputSearch === '') {
      setSearchResults(projList);
    } else {
      const results = projList.filter((item) =>
        item.proj_name.toLowerCase().includes(inputSearch.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [inputSearch, projList]);

  return (
    <>
      <div className="nb-estimatesHistory-wrapper">
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
              <img src={SearchIcon} alt="search" onClick={handleChange} />
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
        {isLoading ? (
          <div className="circular-progress">
            <CircularProgress />
          </div>
        ) : (
          searchResults.map((p, index) => (
            <div className="nb-estimatesHistory-content" key={p._id}>
              <div className="calender-wrapper">
                <div className="date-box">
                  {/* {console.log("proj", p)} */}

                  <span>{moment(p?.created_date).format("DD")}</span>
                </div>
                <div className="monthYear-box">
                  <span>{moment(p?.created_date).format("MMM YY")}</span>
                </div>
              </div>
              <div className="project-meta">
                <span>PROPOSAL FOR</span>
                {/* <h5 key={p._id} onClick={() => handleEditEstimate(p._id)}>{p.proj_name}</h5> */}
                <h5>
                  <Link to={`/timeline/${p._id}`}>
                    {p.proj_name}
                  </Link>
                </h5>
                <span>PREPARED BY</span>
                <p>{p.prepared_by}</p>
              </div>
              <div className="prog-lang">
                {p.proj_tags.map((tag, index) => {
                  return (
                    <div className="lang-box" key={index}>
                      <span>{tag}</span>
                    </div>
                  )
                })}
              </div>
              <div className="proj-status">
                <div className="status-box" key={p._id}>
                  <span>{p.proj_status}</span>
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
