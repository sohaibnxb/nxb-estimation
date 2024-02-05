import { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Font, Link } from '@react-pdf/renderer';
import mainImage from "./images/main.png"
import headerLogo from "./images/header-logo.png"
import nextbridgeLogo from "./images/logo.png"
import topImage1 from "./images/top1.png"
import topImage2 from "./images/top2.png"
import topImage3 from "./images/top3.png"

// Fonts
import OpenSansRegular from './fonts/OpenSans-Regular.ttf';
import OpenSansMedium from './fonts/OpenSans-Medium.ttf';
import OpenSansBold from './fonts/OpenSans-Bold.ttf';
import OpenSansBoldItalic from './fonts/OpenSans-BoldItalic.ttf';
import CalibriLight from './fonts/Calibri-Light.ttf';
import CalibriRegular from './fonts/Calibri-Regular.ttf';
import CalibriBold from './fonts/Calibri-Bold.ttf';
import CalibriBoldItalic from './fonts/Calibri-Bold-Italic.ttf';
import API from '../../utils/api';


const backendURL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:5000";

// eslint-disable-next-line react/prop-types
const NextbridgeTemplate = ({ projId, }) => {
    const [project, setProject] = useState(null)


    const projectCost = project?.timelines?.reduce((total, item) => (total + item.costing[0].totalCost), 0)
    const notes = project?.notes.split('\n');
    const questions = project?.questions.split('\n');


    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await API.get(`${backendURL}/api/projects/${projId}`)
                setProject(response.data)
            } catch (error) {
                console.log(error);
            }
        }
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
    Font.register({
        family: 'Calibri',
        fonts: [
            { src: CalibriLight, fontWeight: 'light' },
            { src: CalibriRegular, fontWeight: 'normal' },
            { src: CalibriBold, fontWeight: 'bold' },
            { src: CalibriBoldItalic, fontWeight: 'bold', fontStyle: 'italic' },

        ],
    });

    // Style Object
    const styles = StyleSheet.create({

        page: {
            color: 'black',
            fontFamily: 'Open Sans',
            fontSize: '12px',
            padding: 26

        },

        section: {

        },
        bodyText: {
            fontSize: '14px',
            color: '#3F3F3F',
            fontFamily: 'Calibri',
            fontWeight: 'light',
            lineHeight: 1.5
        },
        textBold: {
            fontWeight: 'bold',
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
            headerLogo: {
                width: '139px',
            },
            text: {
                fontSize: '10px',
                color: '#808080',
            },
            v1: {
                padding: 0,
            },
            v2: {
                height: '150px',
                padding: 0,
            }
        },
        footer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            bottom: 12,
            width: '100%',
            link: {
                fontSize: '10px',
                color: '#808080',
                textDecoration: 'none',
                alignSelf: 'baseline',
            },
            logo: {
                width: '75px',
                height: '8px',
            },
            hrLeft: {
                width: '10%',
                height: '1px',
                backgroundColor: 'black',

            },
            hrRight: {
                width: '70%',
                height: '1px',
                backgroundColor: 'black',
            },
            v1: {
                width: '90%',
            },
        },
        verticalContent: {
            position: 'absolute',
            bottom: '30%',
            right: 20,
            transform: 'rotate(-90deg)',
            transformOrigin: 'right',
            text: {
                color: '#E7E7E8',
                fontSize: '50px',
                fontWeight: 'bold',
            }
        },
        // Utilities

        listDiscMarker: {
            width: '4px',
            height: '4px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000',
            borderRadius: '2px',
            marginRight: '6px',
            marginTop: '3px',
        },
        heading1: {
            color: "#3F3F3F",
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: 8,
        },
        heading2: {
            color: "#3F3F3F",
            fontSize: '16px',
            fontWeight: 'bold',
            marginBottom: 8,
        },

        // Main Page
        mainPage: {
            position: 'relative',
            height: '100%',
            width: '100%',
            color: '#ffffff',
            mainImg: {
                position: 'absolute',
                width: '100%',
                height: '100%',
            },
            headerLogo: {
                position: 'absolute',
                top: '5%',
                right: '8%',
                width: '180px',
            },
            content: {
                position: 'absolute',
                bottom: '45%',
                left: '12%',
                right: '12%',

                title: {
                    fontSize: 40,
                    marginBottom: 10,
                    lineHeight: 1,
                    width: '70%'
                },
                subTitle: {
                    fontSize: 18,
                    marginBottom: 5,
                },
                body: {
                    fontSize: 12,
                    width: '58%',
                },

            },
            bottomContent: {
                position: 'absolute',
                bottom: '16%',
                left: '60%',
                fontSize: "14px",
                color: 'black',
            }
        },

        // Secondary Page
        secondaryPage: {

            text: {
                marginTop: '10px',
                marginBottom: '20px',
            },
            content: {
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',

                logo: {
                    width: '50%',
                }
            }
        },

        // About Page
        aboutPage: {
            position: '',
            padding: 0,
            content: {
                marginTop: '-60px',
                paddingHorizontal: '60px',
                width: '80%',
                title: {
                    fontSize: '16px',
                    color: '#3F3F3F',
                    marginBottom: 7,
                },
                qoute: {
                    fontFamily: 'Calibri',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    width: '70%',
                    fontSize: "16px",
                    marginVertical: 24,
                    symbol: {
                        // fontSize: '60px',
                        fontWeight: 'bold',
                        transform: 'scale(2.5)',
                        marginRight: '4px',
                    },
                    qouteText: {
                        color: '#3F3F3F',
                        marginLeft: 4
                    }
                },
                lists: {
                    marginVertical: 20,
                    color: '#3F3F3F',
                    width: '80%',
                    list: {
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                    },
                },

            },
        },




        //  Timelinne Page
        timelinePage: {
            padding: 0,
            paddingBottom: '30px',
            fontFamily: 'Calibri',
            fontSize: '11px',
            color: '#000000',
            topContent: {
                marginTop: '-40px',
                paddingHorizontal: '60px',
            },
            content: {
                paddingHorizontal: '60px',
                marginTop: '16px',
            },
            timelineTable: {
                head: {
                    border: '1px solid #000000',
                    borderBottom: 'unset',
                    borderCollapse: 'collapse',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#3F3F3F',

                },
                body: {
                    border: '1px solid #000000',
                    borderBottom: 'unset',
                    borderCollapse: 'collapse',

                },
                tr: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottom: '1px solid #000000',
                },
                td: {
                    borderCollapse: 'collapse',
                    paddingHorizontal: '10px',
                    paddingVertical: '4px'
                },
                hours: {
                    width: '20%',
                    textAlign: 'center',
                    backgroundColor: '#F1F1F1',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                },
                total: {
                    border: '1px solid #000000',
                    borderTop: 'none',
                    borderCollapse: 'collapse',
                    fontWeight: 'bold',
                    display: 'flex',
                    flexDirection: 'row',
                },
            },
        },



        //  Costing Page
        costingPage: {
            padding: 0,
            paddingBottom: '30px',
            fontFamily: 'Calibri',
            fontSize: '11px',
            color: '#000000',
            topContent: {
                marginTop: '-30px',
                paddingHorizontal: '60px',
            },
            content: {
                paddingHorizontal: '60px',
                marginTop: '16px',
            },
            costingTable: {
                head: {
                    border: '1px solid #000000',
                    borderBottom: 'unset',
                    borderCollapse: 'collapse',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#3F3F3F',

                },
                body: {
                    border: '1px solid #000000',
                    borderBottom: 'unset',
                    borderCollapse: 'collapse',

                },
                tr: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottom: '1px solid #000000',
                },
                td: {
                    borderCollapse: 'collapse',
                    paddingHorizontal: '10px',
                    paddingVertical: '4px',
                    colored: {
                        backgroundColor: '#F1F1F1',
                    }

                },
                hours: {
                    width: '20%',
                    textAlign: 'center',
                    backgroundColor: '#F1F1F1',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                },
                total: {
                    border: '1px solid #000000',
                    borderTop: 'none',
                    borderCollapse: 'collapse',
                    fontWeight: 'bold',
                    display: 'flex',
                    flexDirection: 'row',
                },
            },
        },



        // Asumptions
        asmptionPage: {
            padding: 0,
            fontFamily: 'Calibri',
            fontWeight: 'light',
            fontSize: '11px',
            color: '#3F3F3F',
            content: {
                paddingHorizontal: '60px',
                marginTop: '-30px',
            },
            languages: {
                title: {
                    marginVertical: '10px',
                },
                language: {
                    marginVertical: '2px',
                    marginLeft: '14px',
                }
            },
            notes: {
                marginLeft: '14px',
                note: {
                    marginVertical: '2px'
                }
            },
            questions: {
                marginLeft: '14px',
                note: {
                    marginVertical: '2px'
                }
            }
        },


        // Services Page
        servicesPage: {
            padding: 0,
            content: {
                marginTop: '-60px',
                paddingHorizontal: '60px',
                grid: {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                },
                col: {
                    width: '48%',
                },
                title: {
                    fontFamily: 'Calibri',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginTop: '16px',
                    marginBottom: '8px',
                    color: '#3F3F3F',
                },
                text: {
                    fontFamily: 'Calibri',
                    fontSize: '11px',
                    color: '#3F3F3F',
                    lineHeight: 1.5,
                }
            }
        },



        // Terms & Conditions
        termsPage: {
            padding: 0,
            content: {
                marginTop: '-30px',
                paddingHorizontal: '60px',
                title: {
                    fontFamily: 'Calibri',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginTop: '16px',
                    marginBottom: '8px',
                    color: '#3F3F3F',
                },
                text: {
                    fontFamily: 'Calibri',
                    fontSize: '11px',
                    color: '#3F3F3F',
                    lineHeight: 1.5,
                }
            }
        }

    });

    if (!project) return null;
    return (
        <Document>
            {/* Main Page */}
            <Page style={[styles.page, { padding: 0 }]} >
                <View style={[styles.mainPage]} >
                    <Image style={styles.mainPage.mainImg} src={mainImage} />
                    <Image style={styles.mainPage.headerLogo} src={headerLogo} />
                    <View style={styles.mainPage.content}>
                        <Text style={styles.mainPage.content.title}>{project?.proj_name}</Text>
                        <Text style={styles.mainPage.content.subTitle}>Development Proposal</Text>
                        <Text style={styles.mainPage.content.body}>This document contains the time and budget estimation for web application and UIUX based on provided requirements</Text>
                    </View>
                    {/* Bottom Content */}
                    <View style={styles.mainPage.bottomContent} >
                        <Text>Prepared for:</Text>
                        <Text>{project?.proposal_for}</Text>
                    </View>
                </View>
            </Page>

            {/* Secondary Page */}
            <Page style={[styles.page, styles.secondaryPage]}>
                <View style={[styles.section]}>
                    {/* Header */}
                    <View style={styles.header} fixed>
                        <Image style={styles.header.headerLogo} src={headerLogo} quality={90} />
                        <Text style={styles.header.text}>NX-DEV-T-01-v1.0-Private-Development Proposal vteams</Text>
                    </View>
                    {/*  Content */}
                    <View style={styles.secondaryPage.content} >
                        <Image style={styles.secondaryPage.content.logo} src={nextbridgeLogo} quality={50} />
                    </View>
                </View>

                {/* Footer */}
                <View style={styles.footer} fixed >
                    <View style={styles.footer.hrLeft}></View>
                    <Image style={styles.footer.logo} src={nextbridgeLogo} quality={50} />
                    <View style={styles.footer.hrRight}></View>
                    <Link src='https://nextbridge.com' style={styles.footer.link} >www.Nextbridge.com</Link>
                </View>
            </Page>

            {/* About Page */}
            <Page style={[styles.page, styles.aboutPage]}  >
                {/* Header */}
                <View style={[styles.header, styles.header.v1]} fixed >
                    <Image src={topImage1} />
                </View>

                {/*  Content */}
                <View style={styles.aboutPage.content} >
                    <Text style={[styles.heading1]}>About Us</Text>
                    <Text style={styles.aboutPage.content.title} >
                        We Make Good Engineers, and Good Engineers Make Great Software
                    </Text>
                    <Text style={[styles.bodyText,]}>
                        Nextbridge (Pvt.) Ltd. is a 360° Tech Company with agility built into its very structure. We are 100% SCRUM and offer skilled Engineers trained in the latest Software Technologies. Since 1996, Nextbridge (Pvt.) Ltd. has groomed in-house Engineering talent to now become a sizable contributor to Pakistan’s IT exports.
                    </Text>
                    <View style={styles.aboutPage.content.qoute}>
                        <View style={styles.aboutPage.content.qoute.symbol} ><Text>“</Text></View>
                        <Text style={styles.aboutPage.content.qoute.qouteText} >
                            Besides being trusted by some <Text style={styles.textBold}>multinational businesses,</Text> most of our work has been for <Text style={styles.textBold}>Entrepreneurs</Text> passionate to make their mark in the world.
                        </Text>
                    </View>
                    <Text style={styles.bodyText}>
                        We practice scrutiny in our recruitment process to build the most committed teams. As a result, Nextbridge (Pvt.) Ltd. is counted among Pakistan’s most well-resourced software houses. We have grown to:
                    </Text>
                    <View style={styles.aboutPage.content.lists}>
                        <View style={styles.aboutPage.content.lists.list}>
                            <View style={styles.listDiscMarker}></View>
                            <Text style={styles.bodyText}>400+ Professionals</Text>
                        </View>
                        <View style={styles.aboutPage.content.lists.list}>
                            <View style={styles.listDiscMarker}></View>
                            <Text style={styles.bodyText}>Dedicated Divisions for Major Technologies</Text>
                        </View>
                        <View style={styles.aboutPage.content.lists.list}>
                            <View style={styles.listDiscMarker}></View>
                            <Text style={styles.bodyText}>Development Centers in 3 major cities of Pakistan: Lahore, Islamabad and Multan</Text>
                        </View>
                    </View>
                    <Text style={styles.bodyText}>
                        Our Developers are picked after a thorough recruitment process in which their skill and ability to integrate with clients is measured.
                    </Text>

                </View>


                {/* Footer */}
                <View style={[styles.footer, styles.footer.v1]} fixed >
                    <View style={styles.footer.hrLeft}></View>
                    <Image style={styles.footer.logo} src={nextbridgeLogo} quality={50} />
                    <View style={styles.footer.hrRight}></View>
                    <Link src='https://nextbridge.com' style={styles.footer.link} >www.Nextbridge.com</Link>
                </View>

                {/* Vertical content */}
                <View style={styles.verticalContent} fixed >
                    <Text style={styles.verticalContent.text}>
                        About US
                    </Text>
                </View>
            </Page>

            {/* Services Page */}
            <Page style={[styles.page, styles.servicesPage]}>
                {/* Header */}
                <View style={[styles.header, styles.header.v1]} fixed  >
                    <Image src={topImage2} style={{ border: 0 }} />
                </View>


                {/* Content */}
                <View style={styles.servicesPage.content}>
                    <Text style={[styles.heading1]}>Services</Text>

                    <View style={styles.servicesPage.content.grid}>
                        <View style={styles.servicesPage.content.col}>
                            <Text style={styles.servicesPage.content.title}>Software Development</Text>
                            <Text style={styles.servicesPage.content.text}>
                                Having been in the business since 1996, we hold unmatchable expertise in software development. Delivery of more than 1,000 software projects have enabled us to work on variety of architectures, technologies, databases and scales. Name any popular software technology and we can program in it. If you are layman to software, we shall help you picking up the right technology which can support your business operations in the long run.
                            </Text>
                        </View>

                        <View style={styles.servicesPage.content.col}>
                            <Text style={styles.servicesPage.content.title}>Mobile Development</Text>
                            <Text style={styles.servicesPage.content.text}>
                                As one of the pioneers in mobile development in Pakistan, our mobile division provides holistic solutions in iOS and Android mobile development. Our engineering teams develop for mobile devices including tablets and smart watches. Besides excelling at developing your idea into an iOS (iPhone/iPad) or Android (Mobile/Tablet) app, we also develop apps for Apple TV, Apple Watch and Android TV Box. Our engineers are familiar with the latest development standards and hardware capabilities of modern mobile devices.
                            </Text>
                        </View>

                    </View>

                    <View style={[styles.servicesPage.content.grid, { marginTop: '40px' }]}>

                        <View style={styles.servicesPage.content.col}>
                            <Text style={styles.servicesPage.content.title}>Business Analysis</Text>
                            <Text style={styles.servicesPage.content.text}>
                                Business Analysis is systematic approach to automate your systems and helps you in your most important I.T. Projects. It is ideal in a market like Pakistan where decision makers are not I.T. literate. To do this, our Business Analyst visits your office, goes through your system and related documents, meets with in-house staff and maps out all required aspects. This preliminary analysis is further refined and once approved, sent to the software development team for price and time estimation to automate your system.
                            </Text>
                        </View>

                        <View style={styles.servicesPage.content.col}>
                            <Text style={styles.servicesPage.content.title}>Network Consultancy</Text>
                            <Text style={styles.servicesPage.content.text}>
                                Solid network is basic need to run a solid base. Owing to most of our experience of the U.S. market, we got a chance to work on complicated systems and solved complex problems. Wide range of our Network Services include: Server Management, Network Monitoring, Network Security, E-mail Server Management, Intrusion Prevention, Disaster Recovery and High Availability Cluster Management.
                            </Text>
                        </View>
                    </View>
                </View>


                {/* Footer */}
                <View style={[styles.footer, styles.footer.v1]} fixed >
                    <View style={styles.footer.hrLeft}></View>
                    <Image style={styles.footer.logo} src={nextbridgeLogo} quality={50} />
                    <View style={styles.footer.hrRight}></View>
                    <Link src='https://nextbridge.com' style={styles.footer.link} >www.Nextbridge.com</Link>
                </View>

                {/* Vertical content */}
                <View style={[styles.verticalContent, { bottom: '27%' }]} fixed >
                    <Text style={styles.verticalContent.text}>
                        Services
                    </Text>
                </View>


            </Page>


            {/* Timeline Page */}
            <Page style={[styles.page, styles.timelinePage]}>
                {/* Header */}
                <View style={[styles.header, styles.header.v2]} fixed >
                    <Image src={topImage3} style={{ border: 0 }} />
                </View>


                <View style={styles.timelinePage.topContent}>
                    <Text style={[styles.heading1]}>Development Plan</Text>
                    <Text>We have analyzed the requirements and based on these, the following features have been listed as per our understanding. Please go through the list and confirm:</Text>
                </View>

                {/* Content */}
                <View style={styles.timelinePage.content}>

                    {/* Timeline Table */}
                    {
                        project?.timelines?.map((timeline) => (
                            <View key={timeline?._id} style={{ marginBottom: "20px" }}>
                                <View style={styles.timelinePage.timelineTable}>
                                    <View style={styles.timelinePage.timelineTable.head} wrap={false}>
                                        <View style={[styles.timelinePage.timelineTable.td, { width: '80%' }]}><Text>{timeline?.timelineTitle}</Text></View>
                                        <View style={[styles.timelinePage.timelineTable.td, { borderLeft: '1px solid #000000', width: '20%', textAlign: 'center' }]}><Text>Estimation</Text><Text>(Hours)</Text></View>
                                    </View>

                                    <View style={styles.timelinePage.timelineTable.body}>

                                        {
                                            timeline?.items?.map((item, index) => {
                                                return (
                                                    <View style={styles.timelinePage.timelineTable.tr} key={index} wrap={false} >
                                                        <View
                                                            style={[styles.timelinePage.timelineTable.td, { width: '81%', borderRight: '1px solid #000000', }]}
                                                        >

                                                            <Text>
                                                                <Text>{index + 1}. </Text> {item?.itemName}

                                                            </Text>
                                                            {item?.subItems?.map((subItem) => (
                                                                <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', marginLeft: '14px' }}>
                                                                    <View style={styles.listDiscMarker}>
                                                                    </View>
                                                                    <Text>{subItem}</Text>
                                                                </View>
                                                            ))}
                                                        </View>
                                                        <View style={[styles.timelinePage.timelineTable.td, styles.timelinePage.timelineTable.hours]}><Text>{item?.hours}</Text></View>
                                                    </View>
                                                )
                                            })
                                        }

                                    </View>
                                </View>

                                <View style={styles.timelinePage.timelineTable.total}>
                                    <View style={[styles.timelinePage.timelineTable.td, { width: '80%', textAlign: 'right' }]}><Text>Total</Text></View>
                                    <View style={[styles.costingPage.costingTable.td, { borderLeft: '1px solid #000000', width: '20%', textAlign: 'center', backgroundColor: '#F1F1F1' }]}><Text>{timeline?.totalHours}</Text></View>
                                </View>
                            </View>
                        ))
                    }


                </View>
                {/* Footer */}
                <View style={[styles.footer, styles.footer.v1]} fixed>
                    <View style={styles.footer.hrLeft}></View>
                    <Image style={styles.footer.logo} src={nextbridgeLogo} quality={50} />
                    <View style={styles.footer.hrRight}></View>
                    <Link src='https://nextbridge.com' style={styles.footer.link} >www.Nextbridge.com</Link>
                </View>
            </Page>




            {/* Costing Page */}
            <Page style={[styles.page, styles.costingPage]}>
                {/* Header */}
                <View style={[styles.header, styles.header.v2]} fixed >
                    <Image src={topImage3} style={{ border: 0 }} />
                </View>


                <View style={styles.costingPage.topContent}>
                    <Text style={[styles.heading1]}>Costing</Text>
                </View>

                {/* Content */}
                <View style={styles.costingPage.content}>

                    {/* Costing Table */}
                    <View style={styles.costingPage.costingTable}>
                        <View style={styles.costingPage.costingTable.head}>
                            <View style={[styles.costingPage.costingTable.td, { width: '40%', borderRight: '1px solid #000000' }]}><Text>Description</Text></View>
                            <View style={[styles.costingPage.costingTable.td, { width: '20%', borderRight: '1px solid #000000', textAlign: 'center' }]}><Text>Effort(Hours)</Text></View>
                            <View style={[styles.costingPage.costingTable.td, { width: '20%', borderRight: '1px solid #000000', textAlign: 'center' }]}><Text>Rate</Text></View>
                            <View style={[styles.costingPage.costingTable.td, { width: '20%', textAlign: 'center' }]}><Text>Cost</Text></View>
                        </View>

                        <View style={styles.costingPage.costingTable.body}>
                            {
                                project?.timelines?.map((timeline) => (
                                    <View style={styles.costingPage.costingTable.tr}>
                                        <View
                                            style={[styles.costingPage.costingTable.td, { width: '40%', borderRight: '1px solid #000000' }]}
                                        >
                                            <Text>{timeline?.timelineTitle}</Text>
                                        </View>
                                        <View
                                            style={[styles.costingPage.costingTable.td, styles.costingPage.costingTable.td.colored, { width: '20%', borderRight: '1px solid #000000', textAlign: 'center' }]}
                                        >
                                            <Text>{(timeline?.costing[0]?.totalHours)}</Text>
                                        </View>
                                        <View
                                            style={[styles.costingPage.costingTable.td, styles.costingPage.costingTable.td.colored, { width: '20%', borderRight: '1px solid #000000', textAlign: 'center' }]}
                                        >
                                            <Text>{timeline?.costing[0]?.hourRate}/Hour</Text>
                                        </View>
                                        <View
                                            style={[styles.costingPage.costingTable.td, styles.costingPage.costingTable.td.colored, { width: '20%', textAlign: 'center' }]}
                                        >
                                            <Text>${timeline?.costing[0]?.totalCost}</Text>
                                        </View>
                                    </View>

                                ))
                            }
                        </View>
                        <View style={styles.costingPage.costingTable.total}>
                            <View style={[styles.costingPage.costingTable.td, { width: '80%', borderRight: '1px solid #000000', textAlign: 'right' }]}><Text>Total</Text></View>
                            <View style={[styles.costingPage.costingTable.td, styles.costingPage.costingTable.td.colored, { width: '20%', textAlign: 'center' }]}><Text>${projectCost}</Text></View>
                        </View>
                    </View>


                </View>
                {/* Footer */}
                <View style={[styles.footer, styles.footer.v1]} fixed>
                    <View style={styles.footer.hrLeft}></View>
                    <Image style={styles.footer.logo} src={nextbridgeLogo} quality={50} />
                    <View style={styles.footer.hrRight}></View>
                    <Link src='https://nextbridge.com' style={styles.footer.link} >www.Nextbridge.com</Link>
                </View>
            </Page>


            {/* languages & Notes */}
            <Page style={[styles.page, styles.asmptionPage]}>
                {/* Header */}
                <View style={[styles.header, styles.header.v2]} fixed >
                    <Image src={topImage3} style={{ border: 0 }} />
                </View>
                <View style={[styles.asmptionPage.content]}>

                    {/* Questions */}
                    <View>
                        <Text style={[styles.heading2, styles.asmptionPage.languages.title]}>Assumption & Questions</Text>
                        <View style={styles.asmptionPage.questions}>
                            {questions?.map((question, index) => (
                                <View
                                    key={index}
                                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}
                                >
                                    <View style={styles.listDiscMarker}></View>
                                    <Text> {question}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Languages */}
                    <View>
                        <Text style={[styles.heading2, styles.asmptionPage.languages.title]}>Programming Languages & Tools</Text>
                        {
                            project?.proj_tags?.map((language, index) => <Text style={styles.asmptionPage.languages.language}><Text>{index + 1}. </Text>{language}</Text>)
                        }

                    </View>

                    {/* Imp Notes */}
                    <View>
                        <Text style={[styles.heading2, styles.asmptionPage.languages.title]}>Important Notes</Text>
                        <View style={styles.asmptionPage.notes}>
                            {notes?.map((note, index) => <Text key={index}><Text>{index + 1}. </Text>{note}</Text>)}
                        </View>
                    </View>
                </View>
                {/* Footer */}
                <View style={[styles.footer, styles.footer.v1]} fixed>
                    <View style={styles.footer.hrLeft}></View>
                    <Image style={styles.footer.logo} src={nextbridgeLogo} quality={50} />
                    <View style={styles.footer.hrRight}></View>
                    <Link src='https://nextbridge.com' style={styles.footer.link} >www.Nextbridge.com</Link>
                </View>
            </Page>


            {/* Terms Page */}
            <Page style={[styles.page, styles.termsPage]}>
                {/* Header */}
                <View style={[styles.header, styles.header.v1]} fixed  >
                    <Image src={topImage3} style={{ border: 0 }} />
                </View>


                {/* Content */}
                <View style={styles.termsPage.content}>
                    <Text style={[styles.heading1]}>Terms & Conditions</Text>

                    <Text style={styles.termsPage.content.title}>MAINTENANCE</Text>
                    <Text style={styles.termsPage.content.text}>
                        Nextbridge (Pvt.) Ltd. will provide 3 months of maintenance services free of cost for only features mentioned in this proposal. Maintenance activity includes diagnosis of problem and resolving bug and issues caused by code written by us.
                    </Text>
                    <Text style={styles.termsPage.content.text}>
                        For any feature development or change request, client can purchase hours depending on development requirements in advance. Purchasing prepaid hours would reduce back and forth communication between client and development team where team can start working on the requirements without waiting for payment approval.
                    </Text>

                    <Text style={styles.termsPage.content.title}>CONSULTATION</Text>
                    <Text style={styles.termsPage.content.text}>
                        To the best of our efforts, we provide consultation and support to Client in terms of development strategy. Despite our suggestions, it is the Client’s decision to opt for our suggested plan or not. We shall not be liable for any indirect, special, consequential or incidental damages or loss of revenue or business profits, however caused.
                    </Text>


                    <Text style={styles.termsPage.content.title}>NTELLECTUAL RIGHTS</Text>
                    <Text style={styles.termsPage.content.text}>
                        Client shall own all rights, title and interest in and to the deliverable. Any code written or graphics designed shall be under the ownership of Client.
                    </Text>


                    <Text style={styles.termsPage.content.title}>AGREEMENT</Text>
                    <Text style={styles.termsPage.content.text}>
                        This document shall constitute the complete agreement between the Client and Nextbridge (Pvt.) Ltd. This agreement may not be extended, amended, terminated, or superseded except by agreement in writing between both parties. This Agreement supersedes all previous communication between the Client and Nextbridge (Pvt.) Ltd. team, whether oral or written, regarding subject matter..
                    </Text>


                    <Text style={styles.termsPage.content.title}>THIRD PARTY SERVICES</Text>
                    <Text style={styles.termsPage.content.text}>
                        The quote provided in this proposal does not include hosting costs or any third party integration cost. The client will be informed if integration of any third party service to implement a functionality of the app requires payment, and must be made in addition to the design & development cost quoted in this proposal.
                    </Text>


                </View>


                {/* Footer */}
                <View style={[styles.footer, styles.footer.v1]} fixed >
                    <View style={styles.footer.hrLeft}></View>
                    <Image style={styles.footer.logo} src={nextbridgeLogo} quality={50} />
                    <View style={styles.footer.hrRight}></View>
                    <Link src='https://nextbridge.com' style={styles.footer.link} >www.Nextbridge.com</Link>
                </View>

                {/* Vertical content */}
                <View style={[styles.verticalContent, { bottom: '60%' }]} fixed >
                    <Text style={styles.verticalContent.text}>
                        Terms & Conditions
                    </Text>
                </View>


            </Page>
        </Document >
    );
};

export default NextbridgeTemplate;