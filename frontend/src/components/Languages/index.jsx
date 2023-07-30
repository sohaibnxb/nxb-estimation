import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import Select, { components } from "react-select";
import CreatableSelect from 'react-select/creatable';
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import { Button, Card } from "@mui/material";
import Pdf from "../../assets/images/google-drive-pdf-file.png";
import Search from "../../assets/images/search.svg";
import ProgressBar from "../common/ProgressBar";
import axios from "axios";

import SaveIcon from '@mui/icons-material/Save';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ReactPDF, { PDFDownloadLink, PDFViewer, BlobProvider } from '@react-pdf/renderer';
import ReactPdf from "../ReactPdf/ReactPdf";
import "./style.scss";
import { useSelector } from "react-redux";

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={Search} alt="search" />
    </components.DropdownIndicator>
  )
}

const Languages = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const navigate = useNavigate()
  const [message, setMessage] = useState('');
  const [vteam, setVteam] = useState('6395ded86d71e15926fbbdc1');
  const [nxb, setNxb] = useState('6395df75a9038f587df95185');
  const [generatePdf, setGeneratePdf] = useState(false)
  // const [project, setProject] = useState(null)
  const [isReady, setIsReady] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const previewDropDownRef = useRef(null)
  const { project } = useSelector(state => state.timeline)


  const options = [
    { value: "PHP", label: "PHP" },
    { value: "HTML5", label: "HTML5" },
    { value: "CSS3", label: "CSS3" },
    { value: ".NET", label: ".NET" },
    { value: "React JS", label: "React JS" },
    { value: "Node JS", label: "Node JS" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "SQL", label: "SQL" },
    { value: "SQL SERVER", label: "SQL SERVER" },
    { value: "MySQL", label: "MySQL" },
    { value: "Laravel", label: "Laravel" },
    { value: "SQA", label: "SQA" },
    { value: "BA", label: "BA" },
    { value: "Python", label: "Python" },
  ];

  const handleMessageChange = event => {
    setMessage(event.target.value);
    setGeneratePdf(false);
    console.log(event.target.value);
  };

  const toggleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  async function addTagsAndTerms() {
    let getValue = selectedOption.map(function (s) {
      return s["value"];
    });
    // var projName = localStorage.getItem("projName");
    // console.log(projName);
    console.log("getValue", getValue);
    //  await data(getValue, projName);

    // Set languages
    await axios
      .put("http://localhost:5000/api/projects/tags", {
        proj_name: project?.proj_name,
        proj_tags: getValue,
      })
      .then((response) => {
        console.log(response.data);
        // setProject(response.data)
        setGeneratePdf(true)
      })
      .catch((error) => {
        console.log(error);
        console.log("error form terms");
      });
    console.log(message, 'message');

    // Set Notes
    await axios
      .put("http://localhost:5000/api/projects/terms", {
        proj_name: project?.proj_name,
        terms_conditions: message
      })
      .then((response) => {
        console.log("res from terms & conditions ", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function AddVteamTemp() {
    await addTagsAndTerms();
    // vteams template
    try {
      const response = await axios
        .put("http://localhost:5000/api/projects/temp", {
          proj_name: project?.proj_name,
          temp_id: vteam,
        })
      console.log(response.data);
      if (response) {
        setIsReady(true);
      }
    } catch (error) {
      console.log(error);
    }

  }

  const handleSelectedOptions = (options) => {
    setSelectedOption(options)
    setGeneratePdf(false)
  }

  async function AddNxbTemp() {
    await addTagsAndTerms();
    // var projName = localStorage.getItem("projName");
    // vteams template
    axios
      .put("http://localhost:5000/api/projects/temp", {
        proj_name: project?.proj_name,
        temp_id: nxb,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Close dropdown on clicking outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (previewDropDownRef.current && !previewDropDownRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };


  }, [])

  return (
    <>
      <Topbar estimate={false} limiteRole={false} />

      <ProgressBar steps={4} />

      <form onSubmit={(e) => e.preventDefault()}>
        <Card className="languages-card">
          <div>
            <h2 className="languages-title"> Programming Languages</h2>-
            <CreatableSelect
              placeholder="Search / add tags"
              isMulti
              defaultValue={selectedOption}
              onChange={(options) => handleSelectedOptions(options)}
              options={options}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator,
              }}
            />
          </div>

          <div>
            <h2 className="languages-title"> Important Notes</h2>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleMessageChange}
              cols="30"
              rows="10"
              placeholder="Insert your important notes here..."
              className="imp-notes"
            >
            </textarea>
          </div>
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
            className=" dark-button estimate-nav-btn"
            onClick={AddVteamTemp}
          >
            {/* {!generatePdf && 'Generate Pdf'} */}
            <SaveIcon sx={{ marginRight: 1 }} />
            Save Estimate
          </Button>
          {/* dropdown button */}
          <div className="preview-dropdown" ref={previewDropDownRef}>
            {
              generatePdf &&
              <Button
                variant="contained"
                className="secondary-btn estimate-nav-btn preview-dropdown-btn"
                onClick={toggleDropdown}
              >
                Preview As
                <KeyboardArrowDownIcon sx={{ alignSelf: 'center', position: 'absolute', right: 8 }} />
              </Button>
            }
            {/* dropdown menu */}
            <ul className={`preview-dropdown-menu ${isDropDownOpen ? 'show' : ''}`}>
              <li className="preview-dropdown-item" onClick={toggleDropdown}>
                <BlobProvider document={generatePdf && <ReactPdf projId={project?._id} projName={project?.proj_name} />}>
                  {({ url, loading }) => (
                    <a href={url} target="_blank" rel="noreferrer">
                      {loading ? 'Generatiing Preview...' : 'Vteams'}
                      {/* Vteams */}
                    </a>
                  )}
                </BlobProvider>
              </li>
              <li className="preview-dropdown-item" onClick={toggleDropdown}>
                <BlobProvider document={generatePdf && <ReactPdf projId={project?._id} projName={project?.proj_name} />}>
                  {({ url, loading }) => (
                    <a href={url} target="_blank" rel="noreferrer">
                      {loading ? 'Generatiing Preview...' : 'Nextbridge'}
                      {/* Nextbridge */}
                    </a>
                  )}
                </BlobProvider>
              </li>
            </ul>
          </div>

        </div>
      </form >

      <Footer />
    </>
  );
};



// Estimate is prepared based on our understanding of tasks as listed above.  Any modification or addition in above task list will affect time and cost as per scope. Logo, Images, video and other content will be provided by client. We will use Bootstrap as our HTML/CSS stan dards. Markup will be compatible to all modern browsers, for internet explorer, version 12 and above will be supportive only

export default Languages