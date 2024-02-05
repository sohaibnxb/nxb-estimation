import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { components } from "react-select";
import CreatableSelect from 'react-select/creatable';
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import { Button, Card, Tabs, Tab, Box } from "@mui/material";
import Search from "../../assets/images/search.svg";
import ProgressBar from "../common/ProgressBar";

import SaveIcon from '@mui/icons-material/Save';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { BlobProvider } from '@react-pdf/renderer';
import VteamsTemplate from "../pdf/VteamsTemplate";
import "./style.scss";
import { useSelector } from "react-redux";
import NextbridgeTemplate from "../pdf/NextbridgeTemplate";
import API from "../../utils/api";

const backendURL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";

const Languages = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate()
  const [notes, setNotes] = useState('');
  const [questions, setQuestions] = useState('');
  const [vteam, setVteam] = useState('6395ded86d71e15926fbbdc1');
  const [nxb, setNxb] = useState('6395df75a9038f587df95185');
  const [generatePdf, setGeneratePdf] = useState(false)
  const [isReady, setIsReady] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const previewDropDownRef = useRef(null)
  const { project } = useSelector(state => state.timeline)
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


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
    setNotes(event.target.value);
    setGeneratePdf(false);
    console.log(event.target.value);
  };
  const handleQuestionsChange = event => {
    setQuestions(event.target.value);
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

    // Set languages
    await API
      .put(`${backendURL}/api/projects/tags`, {
        proj_name: project?.proj_name,
        proj_tags: getValue,
      })
      .then((response) => {
        console.log(response.data);
        setGeneratePdf(true)
      })
      .catch((error) => {
        console.log(error);
      });

    // Set Notes
    await API
      .put(`${backendURL}/api/projects/terms`, {
        proj_name: project?.proj_name,
        notes: notes,
        questions: questions,
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
      const response = await API
        .put(`${backendURL}/api/projects/temp`, {
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
    API
      .put(`${backendURL}/api/projects/temp`, {
        proj_name: project?.proj_name,
        temp_id: nxb,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/");
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

  // Load the project languages and notes
  useEffect(() => {
    const formatedOptions = project?.proj_tags.map(projectTag => ({ value: projectTag, label: projectTag }))
    setSelectedOption(formatedOptions)
    setNotes(project?.notes)
    setQuestions(project?.questions)
  }, [])

  return (
    <>
      <Topbar estimate={false} limiteRole={false} />

      <ProgressBar steps={4} />

      <form onSubmit={(e) => e.preventDefault()}>
        <Card className="languages-card">
          <div>
            <h2 className="languages-title"> Programming Languages</h2>
            <CreatableSelect
              placeholder="Search / add tags"
              isMulti
              value={[...selectedOption]}
              onChange={(options) => handleSelectedOptions(options)}
              options={options}
              styles={{
                menu: provided => ({ ...provided, zIndex: 3 })
              }}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator,
              }}
            />
          </div>


          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop: '24px' }}>
            <Box sx={{ alignSelf: 'center' }}>
              <Tabs value={tabValue} onChange={handleTabChange} sx={{ backgroundColor: '#F4F4F5', borderRadius: '8px', padding: '6px', '& .MuiTabs-indicator': { height: '50px', backgroundColor: 'white', borderRadius: '6px', zIndex: '1' } }} aria-label="basic tabs example" >
                <Tab label="Important Notes" {...a11yProps(0)} sx={{ color: 'rgb(113, 113, 122)', textTransform: 'capitalize', minHeight: '40px', zIndex: '2', padding: '12px', '&.Mui-selected': { color: 'rgb(9, 9, 11)', } }} />
                <Tab label="Assumption & Questions" {...a11yProps(1)} sx={{ color: 'rgb(113, 113, 122)', textTransform: 'capitalize', minHeight: '40px', zIndex: '2', padding: '12px', '&.Mui-selected': { color: 'rgb(9, 9, 11)', } }} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
              <textarea
                id="notes"
                name="notes"
                value={notes}
                onChange={handleMessageChange}
                cols="30"
                rows="10"
                placeholder="Insert your important notes here..."
                className="imp-notes"
              >
              </textarea>
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
              <textarea
                id="questions"
                name="questions"
                value={questions}
                onChange={handleQuestionsChange}
                cols="30"
                rows="10"
                placeholder="Insert your Assumption & Questions here..."
                className="imp-notes"
              >
              </textarea>
            </CustomTabPanel>

          </Box>
        </Card>

        {/* Action Buttons */}
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
                <BlobProvider document={generatePdf && <VteamsTemplate projId={project?._id} projName={project?.proj_name} />}>
                  {({ url, loading }) => (
                    <a href={url} target="_blank" rel="noreferrer">
                      {loading ? 'Generatiing Preview...' : 'Vteams'}
                      {/* Vteams */}
                    </a>
                  )}
                </BlobProvider>
              </li>
              <li className="preview-dropdown-item" onClick={toggleDropdown}>
                <BlobProvider document={generatePdf && <NextbridgeTemplate projId={project?._id} projName={project?.proj_name} />}>
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

export default Languages


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={Search} alt="search" />
    </components.DropdownIndicator>
  )
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}