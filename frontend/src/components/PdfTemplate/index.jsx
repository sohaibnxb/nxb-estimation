import "./style.scss";  
import  nextwerkImg from "./images/NEXTWORK.png"
import  vteamsImg from "./images/vteams.png"
import  processImg from "./images/process.png"

function PdfTemplate() {
    return (
        <>
            <section className="main-bg">
                <div className="content-div">
                    <h1>Project Name</h1>
                    <h3>Development Proposal</h3>
                    <hr />
                </div>
                <div className="footer">
                    <table>
                        <tr>
                            <td>Proposal For</td>
                            <td>PREPARED BY</td>
                            <td>CREATED ON</td>
                        </tr>
                        <tr>
                            <td><b>Name</b></td>
                            <td><b>Vteams</b></td>
                            <td><b>January 12, 2013</b></td>
                        </tr>
                    </table>
                </div>
            </section>

            <div className="pagebreak"></div>

            <section className="snd-page">
                <header>
                    <table>
                        <tr>
                            <td className="nextwork">
                                <img src={nextwerkImg} alt="" />
                            </td>
                            <td className="heading">
                                NX-DEV-T-01-v1.0-Private-Development Proposal vteams
                            </td>
                            <td className="vtemas">
                                <img src={vteamsImg} alt="" />
                            </td>
                        </tr>
                    </table>
                </header>
                <div className="history">
                    <h1>Revision <span>History</span></h1>
                    <table>
                        <thead>
                            <tr>
                                <th className="RHName">Name</th>
                                <th className="RHDate">Date</th>
                                <th className="RHReson">Reson For Change</th>
                                <th className="RHVersion">Version</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Dec 28,1970</td>
                                <td>Draft</td>
                                <td>1.0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="pagebreak"></div>

            <section className="third-page">
                <header>
                    <table>
                        <tr>
                            <td className="nextwork">
                                <img src={nextwerkImg} alt="" />
                            </td>
                            <td className="heading">
                                NX-DEV-T-01-v1.0-Private-Development Proposal vteams
                            </td>
                            <td className="vtemas">
                                <img src={vteamsImg} alt="" />
                            </td>
                        </tr>
                    </table>
                </header>
                <div className="project">
                    <h1>Revision <span>History</span></h1>
                    <p>My Medication station is a devices where patient can store their medicine and with the help of technology
                        it will make them easy to ﬁnd their medication effortlessly.</p>
                    <div style={{ margin: "50px 0px" }}>
                        <h1>Our <span>Process</span></h1>
                        <img style={{ marginTop: "50px" }} src={processImg} alt="" />
                    </div>
                    <p>You will have complete ownership of any resources developed as part of this process; including code,
                        graphics, documentation etc. </p>
                </div>
            </section>

            <div className="pagebreak"></div>

            <section className="fourth-page">
                <header>
                    <table>
                        <tr>
                            <td className="nextwork">
                                <img src={nextwerkImg} alt="" />
                            </td>
                            <td className="heading">
                                NX-DEV-T-01-v1.0-Private-Development Proposal vteams
                            </td>
                            <td className="vtemas">
                                <img src={vteamsImg} alt="/" />
                            </td>
                        </tr>
                    </table>
                </header>
                <p>The modules below are created as per your requirements. Please review following modules and timeline.</p>
                <div className="timeline">
                    <h1>Project <span>Timeline <span style={{ fontSize: "25px" }}>(Tentative)</span></span></h1>
                    <p>The development of your app will take approx. <span>X</span> Months. This timeline is tentative and relies on the
                        final understanding of the requirements.</p>
                    <table>
                        <thead>
                            <tr>
                                <td>Months</td>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>January</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Feburary</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>March</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <table style={{ width: "40%", border: "none" }}>
                        <tbody>
                            <tr style={{ height: "auto", border: "none" }}>
                                <td style={{ width: "13.75pt", height: "14pt", background: "#00B0F0", padding: "0", border: "none" }}></td>
                                <td style={{ border: "none" }}>
                                    <p style={{ fontSize: "8.0pt", margin: "0" }}>Complete Months</p>
                                </td>
                                <td style={{ width: "13.75pt", background: "#C6D9F1", padding: "0", border: "none" }}></td>
                                <td style={{ border: "none" }}>
                                    <p style={{ fontSize: "8.0pt", margin: "0" }}>Complete Months</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="pagebreak"></div>

            <section className="fifth-page">
                <header>
                    <table>
                        <tr>
                            <td className="nextwork">
                                <img src={nextwerkImg} alt="" />
                            </td>
                            <td className="heading">
                                NX-DEV-T-01-v1.0-Private-Development Proposal vteams
                            </td>
                            <td className="vtemas">
                                <img src={vteamsImg} alt="" />
                            </td>
                        </tr>
                    </table>
                </header>
                <div className="timeline">
                    <h1>Timeline <span>Breakdown </span></h1>
                    <table>
                        <thead>
                            <td width="80%">Tasks</td>
                            <td width="20%">Estimation (Hours)</td>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Section Title 1
                                    <li><span>Bullet 1</span></li>
                                    <li><span>Bullet 1</span></li>
                                </td>
                                <td className="table-data-center">XX</td>
                            </tr>
                            <tr>
                                <td>Section Title 2</td>
                                <td className="table-data-center">XX</td>
                            </tr>
                            <tr>
                                <td className="table-data-right"> <b>Total</b> </td>
                                <td className="table-data-center"><b>XX</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Total UI/UX = xx Man Days</p>
                    <table>
                        <thead>
                            <td width="80%">Web Development</td>
                            <td width="20%">Estimation (Hours)</td>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Content heading
                                    <li><span>content</span></li>
                                    <li><span>content</span></li>
                                </td>
                                <td className="table-data-center">XX</td>
                            </tr>
                            <tr>
                                <td className="table-data-right"> <b>Total</b> </td>
                                <td className="table-data-center"><b>XX</b></td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Total Web Development = xxx Hours = xx Man Days</p>
                </div>
            </section>

            <div className="pagebreak"></div>

            <section className="six-page">
                <header>
                    <table>
                        <tr>
                            <td className="nextwork">
                                <img src={nextwerkImg} alt="" />
                            </td>
                            <td className="heading">
                                NX-DEV-T-01-v1.0-Private-Development Proposal vteams
                            </td>
                            <td className="vtemas">
                                <img src={vteamsImg} alt="" />
                            </td>
                        </tr>
                    </table>
                </header>
                {/* <!-- total cost your project --> */}
                <div className="TCYP">
                    <div className="TCYP-left">
                        <h1>Total Cost of <span>Your Project</span></h1>
                        <p>The detailed breakdown of the timeline
                            is given on the next page.</p>
                    </div>
                    <div className="TCYP-right">
                        <h1>$ 00,000.00</h1>
                    </div>
                </div>

                {/* <!-- costing and payment schadule --> */}

                <div className="C_P">
                    <h1>Costing</h1>
                    <table>
                        <thead>
                            <tr>
                                <th className="table-data-left">Services</th>
                                <th className="table-data-center">Rate</th>
                                <td className="table-data-center">Hours</td>
                                <td className="table-data-center">Cost</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="table-data-left">Name</td>
                                <td className="table-data-center">20.00/Hour</td>
                                <td className="table-data-center">4</td>
                                <td className="table-data-center">$000.0</td>
                            </tr>
                            <tr>
                                <td className="table-data-left">Name</td>
                                <td className="table-data-center">20.00/Hour</td>
                                <td className="table-data-center">4</td>
                                <td className="table-data-center">$000.0</td>
                            </tr>
                            <tr>
                                <td colspan="3" className="table-data-right"><b>Total</b></td>
                                <td className="table-data-center"><b>$00,000,00</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="C_P">
                    <h1>Payment <span>Schadule</span></h1>
                    <table >
                        <thead>
                            <tr>
                                <th className="table-data-left">Payment Breakup</th>
                                <th className="table-data-center">% of Total</th>
                                <td className="table-data-center">Payment</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="table-data-left">Installment 1</td>
                                <td className="table-data-center">00%</td>
                                <td className="table-data-center">$00,000.00</td>
                            </tr>
                            <tr>
                                <td className="table-data-left">Installment 1</td>
                                <td className="table-data-center">00%</td>
                                <td className="table-data-center">$00,000.00</td>
                            </tr>
                            <tr>
                                <td colspan="2" className="table-data-right"><b>Total</b></td>
                                <td className="table-data-center"><b>$00,000,00</b></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="pagebreak"></div>

            <section className="seven-page">
                <header>
                    <table>
                        <tr>
                            <td className="nextwork">
                                <img src={nextwerkImg} alt="" />
                            </td>
                            <td className="heading">
                                NX-DEV-T-01-v1.0-Private-Development Proposal vteams
                            </td>
                            <td className="vtemas">
                                <img src={vteamsImg} alt="" />
                            </td>
                        </tr>
                    </table>
                </header>
                {/* <!-- questionnaire --> */}
                <div className="questionnaire">
                    <h1>Assumption & <span>Questions</span></h1>
                    <li>Important Bulleted Notes</li>

                    <h1>Programming <span>Languages & Tools</span></h1>
                    <ol style={{ marginLeft: "20px" }}>
                        <li>Tool 1</li>
                        <li>Tool 2</li>
                    </ol>

                    <h1>Important<span> Notes</span></h1>
                    <ol style={{ marginLeft: "20px" }}>
                    <li> Important Notes 1</li>
                    <li> Important Notes 2</li>
                </ol>
            </div>
        </section >

            <div className="pagebreak"></div>

            <section className="eight-page">
                <header>
                    <table>
                        <tr>
                            <td className="nextwork">
                                <img src={nextwerkImg} alt="" />
                            </td>
                            <td className="heading">
                                NX-DEV-T-01-v1.0-Private-Development Proposal vteams
                            </td>
                            <td className="vtemas">
                                <img src={vteamsImg} alt="" />
                            </td>
                        </tr>
                    </table>
                </header>
                <h1>Terms & <span>Conditions</span></h1>
                {/* <!-- term & Condition --> */}
                <div className="T_C">
                    <h4><span><i>01</i></span> Change Requests</h4>
                    <p>The quoted price and time estimate covers only the features listed in this document. A revised quote will be provided in case of any changes suggested to this proposal. Any change requests coming in while development is in progress will be entertained after the completion of development committed to in this proposal.</p>

                    <h4><span><i>02</i></span> Third Party Services</h4>
                    <p>The quote provided in this proposal does not include hosting costs or any third party service integration cost. In case a third party service is required, the client will be informed of any additional costs prior to its purchase.</p>

                    <h4><span><i>03</i></span>Approval</h4>
                    <p>Client will have 7 days after delivery of the final build to conduct acceptance tests. If no issue is reported during this period, the app will be considered accepted by the Client.</p>

                    <h4><span><i>04</i></span>Intellectual Rights</h4>
                    <p>Client will own all rights, title and interest in and to the deliverables listed in this proposal. Any code written or graphics designed as part of this project will be the ownership of Client.</p>

                    <h4><span><i>05</i></span>Consultation</h4>
                    <p>We may provide, to the best of our ability, consultation and support to the Client about their Business Strategy, Mobile Strategy and Marketing Strategy. However, the final decision to implement our recommendations lies with the Client who must take ownership of these decisions and their consequences. vteams will not be liable for any direct, indirect, special, consequential or incidental damages or loss.</p>

                    <h4><span><i>06</i></span>Agreement</h4>
                    <p>This document shall constitute the complete agreement between the Client and vteams. This agreement may not be extended, terminated, or superseded except by agreement in writing between the parties. This Agreement supersedes all previous communication between the Client and vteams, whether oral or written, regarding subject matter.</p>

                </div>
            </section>

            <div className="pagebreak"></div>

            <section className="nine-page">
                <header>
                    <table>
                        <tr>
                            <td className="nextwork">
                                <img src={nextwerkImg} alt="" />
                            </td>
                            <td className="heading">
                                NX-DEV-T-01-v1.0-Private-Development Proposal vteams
                            </td>
                            <td className="vtemas">
                                <img src={vteamsImg} alt="" />
                            </td>
                        </tr>
                    </table>
                </header>
                <div className="steps">
                    <h1>Next<span> Steps</span></h1>
                    <p>You are welcome to reach out to us at any suitable time via email, phone or Skype to discuss this proposal or any ideas you may have had.</p>
                    <p>If you've got everything you need and are ready to get started the work, please contact (name), our Development Manager so we can set everything up for you.</p>
                </div>
            </section>
        </>
    )
}

export default PdfTemplate