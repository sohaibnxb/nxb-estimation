import { useEffect, useState } from 'react'
import axios from 'axios'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import moment from "moment";
import nextwerkImg from "./images/NEXTWORK.png"
import vteamsImg from "./images/vteams.png"
import processImg from "./images/process.png"
import mainImg from "./images/Picture1.png"
import OpenSansRegular from './fonts/OpenSans-Regular.ttf';
import OpenSansMedium from './fonts/OpenSans-Medium.ttf';
import OpenSansBold from './fonts/OpenSans-Bold.ttf';
import OpenSansBoldItalic from './fonts/OpenSans-BoldItalic.ttf';

const backendURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";


const ReactPdf = ({ projId, projName }) => {

    const [project, setProject] = useState(null)
    const [languages, setLanguages] = useState(null)
    // const [projectCost, setProjectCost] = useState(null)
    const [projectScreens, setProjectScreens] = useState(null)

    const sum = projectScreens?.screens?.reduce((accumulator, screen) => {
        return accumulator + parseInt(screen.hours);
    }, 0)

    const projectCost = project?.timelines?.reduce((total, item) => (total + item.costing[0].totalCost), 0)
    // const notes = project?.notes.split(/(?<=\.)\n|(?<=\.) /);

    // const notes = project?.notes.split(/[.\n]+/);
    // const questions = project?.questions.split(/[.\n]+/);
    const notes = project?.notes.split('\n');
    const questions = project?.questions.split('\n');
    const fetchProject = async (project) => {
        // const projId = localStorage.getItem("projId")
        console.log("projId", projId);
        try {
            const response = await axios.get(`${backendURL}/api/projects/${projId}`)
            console.log("proj response", response.data);
            setProject(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    // const fetchCosting = async () => {
    //     // const projName = localStorage.getItem("projName")

    //     try {
    //         const projectCost = await axios.get(`${backendURL}/api/costing/project?projectName=${projName}`)
    //         console.log(projectCost.data)
    //         setProjectCost(projectCost.data[0])
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // const fetchScreens = async () => {
    //     // const projId = localStorage.getItem("projId")
    //     try {
    //         const projectScreens = await axios.get(`${backendURL}/api/screens/screen?project_id=${projId}`)
    //         console.log("project screens", projectScreens.data)
    //         setProjectScreens(projectScreens.data)
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

    useEffect(() => {
        fetchProject()
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
        // Utilities

        listDiscMarker: {
            width: '6px',
            height: '6px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#374151',
            borderRadius: '3px',
            marginRight: '6px'
        }
        ,
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
                right: '12%',

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
                    borderBottom: 0,
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
                    borderTop: '1px solid #E5E5E5',
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
                    marginVertical: '2px',
                    marginLeft: '10px',
                }
            },
            notes: {
                marginLeft: '10px',
                note: {
                    marginVertical: '2px'
                }
            },
            questions: {
                marginLeft: '10px',
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
                        <Text style={[styles.bodyText, styles.processPage.text]}>{project?.proj_description}</Text>
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
                        {
                            project?.timelines?.map((timeline) => (
                                <View key={timeline?._id} style={{marginBottom:"20px"}}>
                                    <View style={styles.timelinePage.timelineTable}>
                                        <View style={styles.timelinePage.timelineTable.head}>
                                            <View style={[styles.timelinePage.timelineTable.td, { width: '80%' }]}><Text>{timeline?.timelineTitle}</Text></View>
                                            <View style={[styles.timelinePage.timelineTable.td, { borderLeft: '1px solid #e5e5e5', width: '20%', textAlign: 'center' }]}><Text>Estimation</Text><Text>(Hours)</Text></View>
                                        </View>

                                        <View style={styles.timelinePage.timelineTable.body}>

                                            {
                                                timeline?.items?.map((item, index) => {
                                                    return (
                                                        <View style={styles.timelinePage.timelineTable.tr} key={index} >
                                                            <View style={[styles.timelinePage.timelineTable.td, { width: '81%', borderRight: '1px solid #e5e5e5', }]}>
                                                                <Text>{item?.itemName}</Text>
                                                                {item?.subItems?.map((subItem) => <Text style={{ marginLeft: "8px" }}> - {subItem}</Text>)}
                                                            </View>
                                                            <View style={[styles.timelinePage.timelineTable.td, { width: '20%', textAlign: 'center' }]}><Text>{item?.hours}</Text></View>
                                                        </View>
                                                    )
                                                })
                                            }

                                        </View>
                                    </View>

                                    <View style={styles.timelinePage.timelineTable.total}>
                                        <View style={[styles.timelinePage.timelineTable.td, { width: '80%', textAlign: 'right' }]}><Text>Total</Text></View>
                                        <View style={[styles.costingPage.costingTable.td, { borderLeft: '1px solid #e5e5e5', width: '20%', textAlign: 'center' }]}><Text>{timeline?.totalHours}</Text></View>
                                    </View>
                                </View>
                            ))
                        }

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
                            <Text >$ <Text style={{ fontWeight: 'bold' }}>{projectCost}</Text></Text>
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
                            {
                                project?.timelines?.map((timeline) => (
                                    <View style={styles.costingPage.costingTable.tr}>
                                        <View style={[styles.costingPage.costingTable.td, { width: '40%', borderRight: '1px solid #e5e5e5' }]}><Text>{timeline?.timelineTitle}</Text></View>
                                        <View style={[styles.costingPage.costingTable.td, { width: '20%', borderRight: '1px solid #e5e5e5', textAlign: 'center' }]}><Text>{timeline?.costing[0]?.hourRate}/Hour</Text></View>
                                        <View style={[styles.costingPage.costingTable.td, { width: '20%', borderRight: '1px solid #e5e5e5', textAlign: 'center' }]}><Text>{(timeline?.costing[0]?.totalHours)}</Text></View>
                                        <View style={[styles.costingPage.costingTable.td, { width: '20%', textAlign: 'center' }]}><Text>${timeline?.costing[0]?.totalCost}</Text></View>
                                    </View>

                                ))
                            }
                        </View>
                        <View style={styles.costingPage.costingTable.total}>
                            <View style={[styles.costingPage.costingTable.td, { width: '80%', borderRight: '1px solid #e5e5e5', textAlign: 'right' }]}><Text>Total</Text></View>
                            <View style={[styles.costingPage.costingTable.td, { width: '20%', textAlign: 'center' }]}><Text>${projectCost}</Text></View>
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

                    {/* Questions */}
                    <View>
                        <Text style={[styles.heading, styles.asmptionPage.languages.title]}>Assumption & <Text style={styles.heading.bold}>Questions</Text></Text>
                        <View style={styles.asmptionPage.questions}>
                            {questions?.map((question, index) => <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><View style={styles.listDiscMarker}> </View> <Text> {question}</Text></View>)}
                        </View>
                    </View>

                    {/* Languages */}
                    <View>
                        <Text style={[styles.heading, styles.asmptionPage.languages.title]}>Programming <Text style={styles.heading.bold}>Languages & Tools</Text></Text>
                        {
                            project?.proj_tags?.map((language, index) => <Text style={styles.asmptionPage.languages.language}><Text>{index + 1}. </Text>{language}</Text>)
                        }

                    </View>

                    {/* Imp Notes */}
                    <View>
                        <Text style={[styles.heading, styles.asmptionPage.languages.title]}>Important <Text style={styles.heading.bold}>Notes</Text></Text>
                        <View style={styles.asmptionPage.notes}>
                            {notes?.map((note, index) => <Text key={index}><Text>{index + 1}. </Text>{note}</Text>)}
                            {/* {notes?.map((note, index) => <View key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><View style={styles.listDiscMarker}> </View> <Text> {note}</Text></View>)} */}
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

export default ReactPdf;