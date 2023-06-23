import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router";
import Select, { components } from "react-select";
import CreatableSelect from 'react-select/creatable';
import Topbar from "../common/Topbar";
import Footer from "../common/Footer";
import { Button, Card } from "@mui/material";
import Pdf from "../../assets/images/google-drive-pdf-file.png";
import Search from "../../assets/images/search.svg";
import "./style.scss";
import ProgressBar from "../common/ProgressBar";
import axios from "axios";
import ReactPDF, { PDFDownloadLink, PDFViewer, BlobProvider } from '@react-pdf/renderer';
// import ReactPdf from "../ReactPdf/ReactPdf";

import { Page, Text, View, Document, StyleSheet, Image, Font, usePDF } from '@react-pdf/renderer';
import moment from "moment";
import nextwerkImg from "./images/NEXTWORK.png"
import vteamsImg from "./images/vteams.png"
import processImg from "./images/process.png"
import mainImg from "./images/Picture1.png"
import OpenSansRegular from './fonts/OpenSans-Regular.ttf';
import OpenSansMedium from './fonts/OpenSans-Medium.ttf';
import OpenSansBold from './fonts/OpenSans-Bold.ttf';
import OpenSansBoldItalic from './fonts/OpenSans-BoldItalic.ttf';

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
  const [project, setProject] = useState(null)
  const [isReady, setIsReady] = useState(false); 
  // const [pdfData, setPdfData] = useState(null);
  const [instance, updateInstance] = usePDF({ document: <ReactPdf languages={selectedOption} /> });
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

    //Update pdf file
    updateInstance(<ReactPDF languages={selectedOption} />);

    // Set languages
    await axios
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
        console.log("error form terms");
      });
    console.log(message, 'message');

    // Set Notes
    await axios
      .put("http://localhost:5000/api/projects/terms", {
        proj_name: projName,
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
      <form onSubmit={(e) => e.preventDefault()}>
        <Card className="languages-card">
          <div>
            <h2 className="languages-title"> Programming Languages</h2>-
            <CreatableSelect
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

          {/* <PDFDownloadLink document={<ReactPdf languages={selectedOption} />} fileName="Estimation.pdf">
            {({ blob, url, loading, error }) =>
              pdfData ? (
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
          </PDFDownloadLink> */}
          {/* <Button
            variant="contained"
            className=" blue-button estimate-nav-btn"
            onClick={AddVteamTemp}
          >
            <span className="btn-icon">
              <img src={Pdf} alt="Pdf" />
            </span>
            Download PDF
          </Button>

          {pdfData && (
            <PDFDownloadLink document={<ReactPdf languages={selectedOption} />} fileName="generated.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Generating PDF...' : error ? 'Error generating PDF' : 'Download PDF'
              }
            </PDFDownloadLink>
          )} */}

          <a onClick={AddVteamTemp} href={instance.url} download="test.pdf" >
            Download pdf
          </a>

        </div>
      </form >
      <PDFViewer>
        <ReactPdf />
      </PDFViewer>
      <Footer />
    </>
  ); 
};



// Estimate is prepared based on our understanding of tasks as listed above.  Any modification or addition in above task list will affect time and cost as per scope. Logo, Images, video and other content will be provided by client. We will use Bootstrap as our HTML/CSS stan dards. Markup will be compatible to all modern browsers, for internet explorer, version 12 and above will be supportive only



const ReactPdf = ({ languages }) => {

  const [project, setProject] = useState(null)
  const [projectCost, setProjectCost] = useState(null)
  const [projectScreens, setProjectScreens] = useState(null)
  const sum = projectScreens?.screens?.reduce((accumulator, screen) => {
    return accumulator + parseInt(screen.hours);
  }, 0)

  const notes = project?.terms_conditions.split(/[.\n]+/);
  const fetchProject = async (project) => {
    const projId = localStorage.getItem("projId")
    console.log("projId", projId);
    try {
      const response = await axios.get(`http://localhost:5000/api/projects/${projId}`)
      console.log("proj response", response);
      setProject(response.data)

    } catch (error) {
      console.log(error);
    }
  }

  const fetchCosting = async () => {
    const projName = localStorage.getItem("projName")

    try {
      const projectCost = await axios.get(`http://localhost:5000/api/costing/project?projectName=${projName}`)
      console.log(projectCost.data)
      setProjectCost(projectCost.data[0])
    } catch (error) {
      console.log(error);
    }
  }
  const fetchScreens = async () => {
    const projId = localStorage.getItem("projId")
    try {
      const projectScreens = await axios.get(`http://localhost:5000/api/screens/screen?project_id=${projId}`)
      console.log("project screens", projectScreens.data)

      setProjectScreens(projectScreens.data)
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    fetchProject()
    fetchCosting()
    fetchScreens()
  }, [])

  Font.register({
    family: 'Open Sans',
    fonts: [
      { src: OpenSansRegular, fontWeight: 'normal' },
      { src: OpenSansBold, fontWeight: 'bold' },
      { src: OpenSansBoldItalic, fontWeight: 'bold', fontStyle: 'italic' },
      { src: OpenSansMedium, fontStyle: 'medium' },
    ],
  });

  // Style Object
  const styles = StyleSheet.create({
    page: {
      color: '#000000',
      fontFamily: 'Open Sans',
      fontSize: '12px',
      padding: 26
    },

    section: {

    },
    bodyText: {
      fontSize: '12px',
    },
    heading: {
      fontSize: '16px',
      color: '#037DD4',
      marginBottom: "4px",
      bold: {
        fontWeight: 'bold',
      }
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      nextwerkImg: {
        width: '139px',

      },
      text: {
        fontSize: '10px',
        color: '#808080',
      },
      vteamsImg: {
        width: '110px',


      }
    },

    // Main Page
    mainPage: {
      position: 'relative',
      height: '100%',
      color: '#ffffff',
      mainImg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: '0px',
        bottom: '0px',
      },
      content: {
        position: 'absolute',
        bottom: '25%',
        left: '12%',

        title: {
          fontSize: 40,
          marginBottom: 5
        },
        subTitle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        line: {
          height: '10px',
          backgroundColor: '#037DD4',
          width: '52%',
          marginTop: 10
        }
      },
      bottomContent: {
        position: 'absolute',
        bottom: '7%',
        left: '12%',
        display: 'flex',
        flexDirection: 'row',
        fontSize: "10px",


        subTitle: {
          marginTop: "5px",
          fontWeight: 'bold'
        }
      }
    },

    // Process Page
    processPage: {
      text: {
        marginTop: '10px',
        marginBottom: '20px',
      }
    },

    //  Timelinne Page
    timelinePage: {
      timelineTable: {
        head: {
          border: '1px solid #E5E5E5',
          borderBottom: 'unset',
          borderCollapse: 'collapse',
          backgroundColor: '#037DD4',
          color: '#ffffff',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        },
        body: {
          border: '1px solid #E5E5E5',
          borderBottom: 'unset',
          borderCollapse: 'collapse',

        },
        tr: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderBottom: '1px solid #E5E5E5',
        },
        td: {
          borderCollapse: 'collapse',
          paddingHorizontal: '10px',
          paddingVertical: '4px'
        },
        total: {
          border: '1px solid #E5E5E5',
          borderTop: 'none',
          borderCollapse: 'collapse',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'row',
        },
      },
    },
    // Costing Page
    costingPage: {
      totalCost: {
        display: 'flex',
        flexDirection: 'row',
        textSec: {
          width: '50%',
          paddingVertical: '15px',
          paddingHorizontal: '14px',
          title: {
            color: '#037DD4',
            fontSize: '14px',
          },
        },
        costSec: {
          display: 'flex',
          flexDirection: 'row',
          width: '50%',
          fontSize: '25px',
          paddingVertical: '15px',
          paddingHorizontal: '10px',
          backgroundColor: '#037DD4',
          color: '#ffffff',
          justifyContent: 'center',
          alignItems: 'center'
        },

      },
      costingTable: {
        // border: '1px solid #E5E5E5',
        borderCollapse: 'collapse',
        head: {
          border: '1px solid #E5E5E5',
          borderBottom: 'unset',
          borderCollapse: 'collapse',
          backgroundColor: '#037DD4',
          color: '#ffffff',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'row',
        },
        body: {
          border: '1px solid #E5E5E5',
          borderCollapse: 'collapse',

        },
        total: {
          border: '1px solid #E5E5E5',
          borderTop: 'unset',
          borderCollapse: 'collapse',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'row',
        },
        tr: {
          display: 'flex',
          flexDirection: 'row',
        },
        td: {
          // border: '1px solid #E5E5E5',
          borderCollapse: 'collapse',
          paddingHorizontal: '10px',
          paddingVertical: '4px'
        },

      },
      languages: {
        title: {
          marginVertical: '20px',
        },
        language: {
          marginVertical: '2px'
        }
      },

    },

    // Asumptions
    asmptionPage: {
      languages: {
        title: {
          marginVertical: '10px',
        },
        language: {
          marginVertical: '2px'
        }
      },
      notes: {
        note: {
          marginVertical: '2px'
        }
      }
    },


    // Terms & Conditions
    termsPage: {
      numbers: {
        fontSize: '16px',
        color: '#037DD4',
        fontWeight: 'bold',
        fontStyle: 'italic'
      },
      title: {
        color: '#686868',
        fontWeight: 'bold',
        marginVertical: '3px'
      }

    }

  });

  return (
    <Document>
      {/* Main Page */}
      <Page style={[styles.page, { padding: 0 }]}>
        <View style={[styles.mainPage]}>
          <Image style={styles.mainPage.mainImg} src={mainImg} />
          <View style={styles.mainPage.content}>
            {/* <Text style={styles.mainPage.content.title}>Project Name</Text> */}
            <Text style={styles.mainPage.content.title}>{project?.proj_name}</Text>
            <Text style={styles.mainPage.content.subTitle}>Development Proposal</Text>
            <View style={styles.mainPage.content.line}></View>
          </View>
          {/* Bottom Content */}
          <View style={styles.mainPage.bottomContent}>
            <View>
              <Text>Proposal For</Text>
              <Text style={styles.mainPage.bottomContent.subTitle}>{project?.proposal_for}</Text>
            </View>
            <View style={{ marginLeft: '100px', marginRight: '55px' }}>
              <Text>PREPARED BY</Text>
              <Text style={styles.mainPage.bottomContent.subTitle}>{project?.prepared_by}</Text>
            </View>
            <View style={{ marginRight: '0px' }}>
              <Text>CREATED ON</Text>
              <Text style={styles.mainPage.bottomContent.subTitle}>{moment(project?.created_date).format("MMM DD YYYY")}</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* Our Process Page */}
      <Page style={styles.page}>
        <View style={[styles.section]}>
          {/* Header */}
          <View style={styles.header} fixed>
            <Image style={styles.header.nextwerkImg} src={nextwerkImg} quality={90} />
            <Text style={styles.header.text}>NX-DEV-T-01-v1.0-Private-Development Proposal vteams</Text>
            <Image style={styles.header.vteamsImg} src={vteamsImg} quality={90} />
          </View>
          {/*  Content */}
          <View>
            <Text style={styles.heading}>Your <Text style={styles.heading.bold}>Project</Text></Text>
            <Text style={[styles.bodyText, styles.processPage.text]}>My Medication station is a devices where patient can store their medicine and with the help of technology it will make them easy to ﬁnd their medication effortlessly.</Text>
            <Text style={styles.heading}>Our <Text style={styles.heading.bold}>Process</Text></Text>
            <Image style={[styles.processPage.processImg, { marginBottom: '30px', }]} src={processImg} />
            <Text style={styles.bodyText}>You will have complete ownership of any resources developed as part of this process; including code, graphics, documentation etc. </Text>
          </View>
        </View>
      </Page>


      {/* Timeline Page */}
      <Page style={styles.page}>
        <View style={styles.section}>
          {/* Header */}
          <View style={styles.header} fixed>
            <Image style={styles.header.nextwerkImg} src={nextwerkImg} quality={90} />
            <Text style={styles.header.text}>NX-DEV-T-01-v1.0-Private-Development Proposal vteams</Text>
            <Image style={styles.header.vteamsImg} src={vteamsImg} quality={90} />
          </View>
          {/* Content */}
          <View>
            <Text style={styles.heading}>Timeline <Text style={styles.heading.bold}>Breakdown</Text></Text>
            {/* Timeline Table */}
            <View style={styles.timelinePage.timelineTable}>
              <View style={styles.timelinePage.timelineTable.head}>
                <View style={[styles.timelinePage.timelineTable.td, { width: '80%' }]}><Text>Tasks</Text></View>
                <View style={[styles.timelinePage.timelineTable.td, { borderLeft: '1px solid #e5e5e5', width: '20%', textAlign: 'center' }]}><Text>Estimation</Text><Text>(Hours)</Text></View>
              </View>

              <View style={styles.timelinePage.timelineTable.body}>

                {
                  projectScreens?.screens?.map(screen => {
                    return (
                      <View style={styles.timelinePage.timelineTable.tr} key={screen?._id}>
                        <View style={[styles.timelinePage.timelineTable.td, { width: '81%', borderRight: '1px solid #e5e5e5', }]}>
                          <Text>{screen?.screenName}</Text>
                          {screen?.screenSections?.map((subScreen, index) => <Text style={{ marginLeft: "8px" }} key={index}> - {subScreen}</Text>)}
                        </View>
                        <View style={[styles.timelinePage.timelineTable.td, { width: '20%', textAlign: 'center' }]}><Text>{screen?.hours}</Text></View>
                      </View>
                    )
                  })
                }

              </View>
            </View>

            <View style={styles.timelinePage.timelineTable.total}>
              <View style={[styles.timelinePage.timelineTable.td, { width: '80%', textAlign: 'right' }]}><Text>Total</Text></View>
              <View style={[styles.costingPage.costingTable.td, { borderLeft: '1px solid #e5e5e5', width: '20%', textAlign: 'center' }]}><Text>{sum}</Text></View>
            </View>
          </View>

        </View>

      </Page>

      {/* Costing Page */}
      <Page style={styles.page}>
        <View style={styles.section}>
          {/* Header */}
          <View style={styles.header} fixed>
            <Image style={styles.header.nextwerkImg} src={nextwerkImg} quality={90} />
            <Text style={styles.header.text}>NX-DEV-T-01-v1.0-Private-Development Proposal vteams</Text>
            <Image style={styles.header.vteamsImg} src={vteamsImg} quality={90} />
          </View>
          {/* Content */}
 
          {/* Total Cost */}
            <View style={styles.costingPage.totalCost}>
            <View style={styles.costingPage.totalCost.textSec}>
              <Text style={styles.costingPage.totalCost.textSec.title}>TOTAL COST <Text style={{ fontWeight: 'bold' }}>OF YOUR PROJECT</Text></Text>
              <Text >The detailed breakdown of the timeline is given on the next page.</Text>
            </View>
            <View style={styles.costingPage.totalCost.costSec}>
              <Text >$ <Text style={{ fontWeight: 'bold' }}>{projectCost?.totalCost}</Text></Text>
            </View>
          </View> 


          {/* Costing */}

          <View style={styles.costingPage.costingTable}>
            <Text style={[styles.heading, styles.costingPage.languages.title]}>Costing</Text>
            <View style={styles.costingPage.costingTable.head}>
              <View style={[styles.costingPage.costingTable.td, { width: '40%', borderRight: '1px solid #e5e5e5' }]}><Text>Services</Text></View>
              <View style={[styles.costingPage.costingTable.td, { width: '20%', borderRight: '1px solid #e5e5e5', textAlign: 'center' }]}><Text>Rate</Text></View>
              <View style={[styles.costingPage.costingTable.td, { width: '20%', borderRight: '1px solid #e5e5e5', textAlign: 'center' }]}><Text>Hour</Text></View>
              <View style={[styles.costingPage.costingTable.td, { width: '20%', textAlign: 'center' }]}><Text>Cost</Text></View>
            </View>

            <View style={styles.costingPage.costingTable.body}>
              <View style={styles.costingPage.costingTable.tr}>
                <View style={[styles.costingPage.costingTable.td, { width: '40%', borderRight: '1px solid #e5e5e5' }]}><Text>{projectCost?.projectName}</Text></View>
                <View style={[styles.costingPage.costingTable.td, { width: '20%', borderRight: '1px solid #e5e5e5', textAlign: 'center' }]}><Text>{projectCost?.hourRate}/Hour</Text></View>
                <View style={[styles.costingPage.costingTable.td, { width: '20%', borderRight: '1px solid #e5e5e5', textAlign: 'center' }]}><Text>{(projectCost?.totalCost) / (projectCost?.hourRate)}</Text></View>
                <View style={[styles.costingPage.costingTable.td, { width: '20%', textAlign: 'center' }]}><Text>${projectCost?.totalCost}</Text></View>
              </View>
            </View>
            <View style={styles.costingPage.costingTable.total}>
              <View style={[styles.costingPage.costingTable.td, { width: '80%', borderRight: '1px solid #e5e5e5', textAlign: 'right' }]}><Text>Total</Text></View>
              <View style={[styles.costingPage.costingTable.td, { width: '20%', textAlign: 'center' }]}><Text>${projectCost?.totalCost}</Text></View>
            </View>
          </View>

        </View>
      </Page>


      {/* languages & Notes */}
      <Page style={styles.page}>
        <View style={[styles.section]}>
          {/* Header */}
          <View style={styles.header} fixed>
            <Image style={styles.header.nextwerkImg} src={nextwerkImg} quality={90} />
            <Text style={styles.header.text}>NX-DEV-T-01-v1.0-Private-Development Proposal vteams</Text>
            <Image style={styles.header.vteamsImg} src={vteamsImg} quality={90} />
          </View>

          <Text style={styles.heading}>Assumption & <Text style={styles.heading.bold}>Questions</Text></Text>

          {/* Languages */}
          <View>
            <Text style={[styles.heading, styles.asmptionPage.languages.title]}>Programming <Text style={styles.heading.bold}>Languages & Tools</Text></Text>
            {
              languages?.map((language, index) => <Text style={styles.asmptionPage.languages.language}><Text>{index + 1}. </Text>{language.value}</Text>)
            }

          </View>

          {/* Imp Notes */}
          <View>
            <Text style={[styles.heading, styles.asmptionPage.languages.title]}>Important <Text style={styles.heading.bold}>Notes</Text></Text>
            <View style={styles.asmptionPage.notes}>

              {notes?.map((note, index) => <Text key={index}><Text>{index + 1}. </Text>{note}</Text>)}
            </View>
          </View>
        </View>
      </Page>


      {/* Terms & Conditions */}
      <Page style={styles.page}>
        <View style={[styles.section]}>
          {/* Header */}
          <View style={styles.header} fixed>
            <Image style={styles.header.nextwerkImg} src={nextwerkImg} quality={90} />
            <Text style={styles.header.text}>NX-DEV-T-01-v1.0-Private-Development Proposal vteams</Text>
            <Image style={styles.header.vteamsImg} src={vteamsImg} quality={90} />
          </View>
          {/*  Content */}
          <View>
            <Text style={styles.heading}>Terms &  <Text style={styles.heading.bold}>Conditions</Text></Text>
            <Text style={styles.termsPage.title}><Text style={styles.termsPage.numbers}>01 </Text> Change Requests</Text>
            <Text>The quoted price and time estimate covers only the features listed in this document. A revised quote will be provided in case of any changes suggested to this proposal. Any change requests coming in while development is in progress will be entertained after the completion of development committed to in this proposal.</Text>

            <Text style={styles.termsPage.title}><Text style={styles.termsPage.numbers}>02 </Text> Third Party Services</Text>
            <Text>The quote provided in this proposal does not include hosting costs or any third party service integration cost. In case a third party service is required, the client will be informed of any additional costs prior to its purchase.</Text>

            <Text style={styles.termsPage.title}><Text style={styles.termsPage.numbers}>03 </Text> Approval</Text>
            <Text>Client will have 7 days after delivery of the final build to conduct acceptance tests. If no issue is reported during this period, the app will be considered accepted by the Client.</Text>

            <Text style={styles.termsPage.title}><Text style={styles.termsPage.numbers}>04 </Text> Intellectual Rights</Text>
            <Text>Client will own all rights, title and interest in and to the deliverables listed in this proposal. Any code written or graphics designed as part of this project will be the ownership of Client.</Text>

            <Text style={styles.termsPage.title}><Text style={styles.termsPage.numbers}>05 </Text> Consultation</Text>
            <Text>We may provide, to the best of our ability, consultation and support to the Client about their Business Strategy, Mobile Strategy and Marketing Strategy. However, the final decision to implement our recommendations lies with the Client who must take ownership of these decisions and their consequences. vteams will not be liable for any direct, indirect, special, consequential or incidental damages or loss.</Text>

            <Text style={styles.termsPage.title}><Text style={styles.termsPage.numbers}>06 </Text> Agreement</Text>
            <Text>This document shall constitute the complete agreement between the Client and vteams. This agreement may not be extended, terminated, or superseded except by agreement in writing between the parties. This Agreement supersedes all previous communication between the Client and vteams, whether oral or written, regarding subject matter.</Text>

          </View>
        </View>
      </Page>
      {/* Next Steps */}
      <Page style={styles.page}>
        <View style={styles.section}>

          {/* Header */}
          <View style={styles.header} fixed>
            <Image style={styles.header.nextwerkImg} src={nextwerkImg} quality={90} />
            <Text style={styles.header.text}>NX-DEV-T-01-v1.0-Private-Development Proposal vteams</Text>
            <Image style={styles.header.vteamsImg} src={vteamsImg} quality={90} />
          </View>
          <View >
            {/* Content */}
            <Text style={styles.heading}>Next <Text style={styles.heading.bold}>Steps</Text></Text>
            <Text>You are welcome to reach out to us at any suitable time via email, phone or Skype to discuss this proposal or any ideas you may have had.</Text>
            <Text> </Text>
            <Text>If you've got everything you need and are ready to get started the work, please contact (name), our Development Manager so we can set everything up for you.</Text>

          </View>
        </View>

      </Page>
    </Document >
  );
};

export default Languages