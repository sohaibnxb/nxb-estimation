import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router";
import Select, { components } from "react-select";
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import { Button, Card } from "@mui/material";
import Pdf from "../../assets/images/google-drive-pdf-file.png";
import Search from "../../assets/images/search.svg";
import "./style.scss";
import ProgressBar from "../common/ProgressBar";
import axios from "axios";
import ReactPDF, { PDFDownloadLink, PDFViewer, BlobProvider } from '@react-pdf/renderer';
import ReactPdf from "../ReactPdf/ReactPdf";
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={Search} alt="search" />
    </components.DropdownIndicator>
  );
};

const Languages = () => {
  const [selectedOption, setSelectedOption] = useState([]);
  const navigate = useNavigate()
  const [message, setMessage] = useState();
  const [vteam, setVteam] = useState('6395ded86d71e15926fbbdc1');
  const [nxb, setNxb] = useState('6395df75a9038f587df95185');
  const [project, setProject] = useState(null)
  const [isReady, setIsReady] = useState(false);

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
    console.log(event.target.value);
  };
  async function addTagsAndTerms() {
    let getValue = selectedOption.map(function (s) {
      return s["value"];
    });
    var projName = localStorage.getItem("projName");
    console.log(projName);
    console.log("getValue", getValue);
    //  await data(getValue, projName);
    axios
      .put("http://localhost:5000/api/projects/tags", {
        proj_name: projName,
        proj_tags: getValue,
      })
      .then((response) => {
        console.log(response.data);
        setProject(response.data)

      })
      .catch((error) => {
        console.log(error);
      });
    console.log(message, 'message');
    axios
      .put("http://localhost:5000/api/projects/terms", {
        proj_name: projName,
        terms_conditions: message,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function AddVteamTemp() {
    await addTagsAndTerms();
    var projName = localStorage.getItem("projName");
    // vteams template
    try {
      const response = await axios
        .put("http://localhost:5000/api/projects/temp", {
          proj_name: projName,
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

  async function AddNxbTemp() {
    await addTagsAndTerms();
    var projName = localStorage.getItem("projName");
    // vteams template
    axios
      .put("http://localhost:5000/api/projects/temp", {
        proj_name: projName,
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
  useEffect(() => {

  }, [])
  return (
    <>
      <Topbar estimate={false} limiteRole={false} />
      <ProgressBar steps={4} />
      <form>
        <Card className="languages-card">
          <div>
            <h2 className="languages-title"> Programming Languages</h2>
            <Select
              placeholder="Search / add tags"
              isMulti
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator,
              }}
            />
          </div>
          <div>
            <h2 className="languages-title"> Important Notes</h2>
            {/* <textarea className="imp-notes">
             
                Estimate is prepared based on our understanding of tasks as
                listed above.
              
                Any modification or addition in above task list will affect time
                and cost as per scope.
              
                Logo, Images, video and other content will be provided by
                client.
              
              We will use Bootstrap as our HTML/CSS stan dards. 
              
                Markup will be compatible to all modern browsers, for internet
                explorer, version 12 and above will be supportive only
              
          </textarea> */}
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={handleMessageChange}
              cols="30"
              rows="10"
              placeholder=""
              className="imp-notes"
            >
              Estimate is prepared based on our understanding of tasks as listed
              above.
              Any modification or addition in above task list will affect
              time and cost as per scope.
              Logo, Images, video and other content
              will be provided by client.
              We will use Bootstrap as our HTML/CSS
              stan dards.
              Markup will be compatible to all modern browsers, for
              internet explorer, version 12 and above will be supportive only
            </textarea>
          </div>
        </Card>
        <div container className="estimate-btns-container">
          <Button
            variant="contained"
            className="secondary-btn estimate-nav-btn"
            onClick={() => navigate(-1)}

          >
            Back
          </Button>

          <BlobProvider document={<ReactPdf languages={selectedOption} />}>
            {({ url }) => (
              <a href={url} target="_blank">
                <Button
                  variant="contained"
                  className="secondary-btn estimate-nav-btn"
                  onClick={addTagsAndTerms}
                >
                  Preview
                </Button>
              </a>
            )}
          </BlobProvider>
          <Button
            variant="contained"
            className=" dark-button estimate-nav-btn"
            onClick={AddNxbTemp}
          >
            <span className="btn-icon">
              <img src={Pdf} alt="Pdf" />
            </span>
            Download PDF
          </Button>


          <PDFDownloadLink document={<ReactPdf languages={selectedOption} />} fileName="Estimation.pdf">
            {({ blob, url, loading, error }) =>
              loading ? (
                <Button
                  variant="contained"
                  className="blue-button estimate-nav-btn"
                  onClick={AddVteamTemp}
                >
                  <span className="btn-icon">
                    <img src={Pdf} alt="Pdf" />
                  </span>
                  Gen PDF
                </Button>) :
                (
                  <Button
                    variant="contained"
                    className="blue-button estimate-nav-btn"
                    onClick={AddVteamTemp}
                  >
                    <span className="btn-icon">
                      <img src={Pdf} alt="Pdf" />
                    </span>
                    Download PDF
                  </Button>
                )
            }
          </PDFDownloadLink>
        </div>
      </form >

      <Footer />

    </>
  );
};

export default Languages;


// Sir last day I worked on pdf generation 