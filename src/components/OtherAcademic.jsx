"use client"
import { useEffect, useState } from "react";
import AcademicGalleryViewer from "./AcademicGalleryViewer";
import { marked } from "marked";

const OtherAcademic = ({ pageContent, baseUrl, highlight }) => {
    const [drpValue, setDrpValue] = useState('');

    useEffect(() => {
        if (highlight === "rank-holder") {
            setDrpValue("3")
        }
        else if (highlight === "skill") {
            setDrpValue("5")
        }
        else if (highlight === "international-training") {
            setDrpValue("6")
        }
        else if (highlight === "research") {
            setDrpValue("7")
        }
        else if (highlight === "alumini") {
            setDrpValue("8")
        }

    }, []);

    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <div className="sticky-left">
                            <div className="find-doctor-left-col">
                                <div className="row">
                                    <div className="tab-group d-md-block d-none text-center mb-3 main-heading sub-heading main-list">
                                        <h3 className="text-start">Department of Academics</h3>
                                        <button type="button" className="btn-tab treat-tab py-3 "
                                            onClick={() => window.location.href = `${baseUrl}/academic?tab=about`}>
                                            About Academics
                                        </button>

                                        <button type="button" className="btn-tab treat-tab py-3"
                                            onClick={() => window.location.href = `${baseUrl}/academic?tab=leader`}>
                                            Academic Leaders
                                        </button>

                                        <button type="button" className="btn-tab treat-tab py-3"
                                            onClick={() => window.location.href = `${baseUrl}/academic?tab=course`}>
                                            Courses We Offer
                                        </button>

                                        <button type="button" className={`${highlight === "rank-holder" ? 'active' : ''} btn-tab treat-tab py-3`}
                                            onClick={() => window.location.href = `${baseUrl}/rank-holders`}>
                                            Rank Holders
                                        </button>

                                        <button type="button" className="btn-tab treat-tab py-3 omega4"
                                            onClick={() => window.location.href = `${baseUrl}/academic?tab=publication`}>
                                            Scientific Publications
                                        </button>
                                        <button type="button" className={`${highlight === "skill" ? 'active' : ''} btn-tab treat-tab py-3`}
                                            onClick={() => window.location.href = `${baseUrl}/skills-and-simulation-lab`}>
                                            Skills & Simulation Lab
                                        </button>
                                        <button type="button" className={`${highlight === "international-training" ? 'active' : ''} btn-tab treat-tab py-3`}
                                            onClick={() => window.location.href = `${baseUrl}/international-training-programs`}>
                                            International Training
                                        </button>
                                        <button type="button" className={`${highlight === "research" ? 'active' : ''} btn-tab treat-tab py-3`}
                                            onClick={() => window.location.href = `${baseUrl}/outstanding-research-work`}>
                                            Research Work
                                        </button>
                                        <button type="button" className={`${highlight === "alumini" ? 'active' : ''} btn-tab treat-tab py-3`}
                                            onClick={() => window.location.href = `${baseUrl}/our-alumini`}>
                                            Our Alumni
                                        </button>
                                        <button type="button" className="btn-tab treat-tab py-3 omega9"
                                            onClick={() => window.location.href = `${baseUrl}/academic?tab=gallery`}>
                                            Gallery
                                        </button>
                                    </div>
                                    <div className="visa-select d-md-none d-block">
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={drpValue}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                if (value === '3')
                                                    window.location.href = `${baseUrl}/rank-holders`
                                                else if (value === '5')
                                                    window.location.href = `${baseUrl}/skills-and-simulation-lab`
                                                else if (value === '6')
                                                    window.location.href = `${baseUrl}/international-training-programs`
                                                else if (value === '7')
                                                    window.location.href = `${baseUrl}/outstanding-research-work`
                                                else if (value === '8')
                                                    window.location.href = `${baseUrl}/our-alumini`
                                                else
                                                    window.location.href = `${baseUrl}/academic?tab=${e.target.value}`

                                            }}>
                                            <option value="about">About Academic</option>
                                            <option value="leader">Academic Leaders</option>
                                            <option value="course">Courses We Offer</option>
                                            <option value="3">Rank Holders</option>
                                            <option value="publication">Scientific Publications</option>
                                            <option value="5">Skills & Simulation Lab</option>
                                            <option value="6">International Training</option>
                                            <option value="7">Research Work</option>
                                            <option value="8">Our Alumni</option>
                                            <option value="gallery">Gallery</option>
                                        </select>
                                    </div>
                                </div>

                                {/* <div className="find-doc-box d-md-block d-none">
                                    <VisaMedicalForm title={pageContent[5]?.title} />
                                </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9 expert-section">
                        <div className="treat-box" id="omega" style={{ display: "block" }}>

                            {/* Rank Holder */}
                            {
                                highlight === "rank-holder" && (
                                    <div className="container main-heading sub-heading main-list">
                                        <h2>{pageContent[0]?.title}</h2>
                                        <section className="section expert-section pt-0">
                                            <div className="container">
                                                <div className="row">
                                                    {
                                                        pageContent[1].contentCard.map((d, i) => {
                                                            return <div className="col-md-4 col-6 mb-4" key={i}>
                                                                <div className="expert-card" data-aos="fade-right">
                                                                    <div className="card border-0 p-lg-4 p-0">
                                                                        <div className="card-top">
                                                                            <img src={d.image?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${d.image.url}` : '/img/no-image.jpg'}
                                                                                className="img-fluid w-100" alt={d.title} />
                                                                        </div>
                                                                        <div className="card-content">
                                                                            <h4>{d.title}</h4>
                                                                            <span style={{ fontSize: "14px" }}>{d.details}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )
                            }

                            {/* Skill Lab */}
                            {
                                highlight === "skill" && (
                                    <div className="container main-heading sub-heading main-list">
                                        <h2>{pageContent[0]?.title}</h2>
                                        <section className="section pt-0">
                                            <div className="container">
                                                <div className="main-heading">
                                                    <h2>{pageContent[1].title}</h2>
                                                </div>
                                                <div className="main-heading sub-heading main-list">
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: marked(pageContent[1]?.details) || "" }}
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        <div className="line-divider"></div>
                                        <section className="section">
                                            <div className="container">
                                                <div className="main-heading">
                                                    <h2>{pageContent[2].title}</h2>
                                                </div>
                                                <div className="main-heading sub-heading main-list">
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: marked(pageContent[2]?.details) || "" }}
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )
                            }

                            {/* International  Training */}
                            {
                                highlight === "international-training" && (
                                    <div className="container main-heading sub-heading main-list">
                                        <h2>{pageContent[0]?.title}</h2>
                                        <section className="section pt-0">
                                            <div className="container">
                                                <div className="main-heading sub-heading main-list">
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: marked(pageContent[1]?.details) || "" }}
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )
                            }

                            {/* Research work */}
                            {
                                highlight === "research" && (
                                    <div className="container main-heading sub-heading main-list">
                                        <h2>{pageContent[0]?.title}</h2>
                                        <section className="section pt-0">
                                            <div className="container">
                                                <div className="main-heading sub-heading main-list">
                                                    <div
                                                        className='table-responsive hear-associations-table'
                                                        dangerouslySetInnerHTML={{ __html: marked(pageContent[1]?.details) || "" }}
                                                    >
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )
                            }



                            {/* Our Alumini */}
                            {
                                highlight === "alumini" && (
                                    <div className="container main-heading sub-heading main-list">
                                        <h2>{pageContent[0]?.title}</h2>

                                        <section className="section pt-0">
                                            <div className="container">
                                                <div className="faq-card p-4">
                                                    <div className="accordion" id="accordionExample">
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className={`accordion-button collapsed`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse0`}
                                                                    aria-expanded={`false`} aria-controls={`collapse0`}>
                                                                    <span>{pageContent[1]?.title}</span>
                                                                </button>
                                                            </h2>
                                                            <div id={`collapse0`} className={`accordion-collapse collapse`} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body main-list" dangerouslySetInnerHTML={{ __html: marked(pageContent[1]?.details || "") || "" }}>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="accordion-item">
                                                            <h2 className="accordion-header">
                                                                <button className={`accordion-button collapsed`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse1`}
                                                                    aria-expanded={`false`} aria-controls={`collapse1`}>
                                                                    <span>{pageContent[2]?.title}</span>
                                                                </button>
                                                            </h2>
                                                            <div id={`collapse1`} className={`accordion-collapse collapse`} data-bs-parent="#accordionExample">
                                                                <div className="accordion-body main-list" dangerouslySetInnerHTML={{ __html: marked(pageContent[2]?.details || "") || "" }}>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                )
                            }
                        </div>

                    </div>

                    {/* <div className="find-doctor-left-col d-md-none d-block">
                        <div className="find-doc-box">
                            <VisaMedicalForm title={pageContent[5]?.title} />
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default OtherAcademic