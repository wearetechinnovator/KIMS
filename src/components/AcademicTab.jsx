"use client"
import { useSearchParams } from "next/navigation";
import AcademicGalleryViewer from "./AcademicGalleryViewer";
import { marked } from "marked";
import { useEffect, useState } from "react";

const AcademicTab = ({ pageContent, baseUrl }) => {
    const searchParams = useSearchParams();
    const [drpValue, setDrpValue] = useState('');
    const [pageTitle, setPageTitle] = useState(null);

    useEffect(() => {
        const tab = searchParams.get('tab');

        const map = {
            about: 'omega',
            leader: 'omega1',
            course: 'omega2',
            publication: 'omega4',
            gallery: 'omega9',
        };

        if (map[tab]) {
            setTimeout(() => {
                showBox(map[tab]);
            }, 0);
        } else {
            setTimeout(() => {
                showBox('omega');
                setPageTitle(pageContent[0]?.title)
            }, 0);
        }

        if (tab === "about") {
            setDrpValue("");
            setPageTitle(pageContent[0]?.title)
        }
        else if (tab === "leader") {
            setDrpValue("1");
            setPageTitle("Academic Leaders")
        }
        else if (tab === "course") {
            setDrpValue("2");
            setPageTitle("Courses We Offer")
        }
        else if (tab === "publication") {
            setDrpValue("4");
            setPageTitle("Scientific Publications")
        }
        else if (tab === "gallery") {
            setDrpValue("9");
            setPageTitle("Gallery")
        }

    }, [searchParams]);


    return (
        <>
            {
                pageTitle?.toLowerCase() !== "About Academics".toLowerCase() && (
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageTitle}</h2>
                        </div>
                    </div>
                )
            }

            <div style={{ display: `${pageTitle?.toLowerCase() == "ABOUT ACADEMICS".toLowerCase() ? 'block' : 'none'}` }}>
                <section className="d-lg-block d-none">
                    <div className="container-wrapper">
                        <div className="owl-carousel owl-theme homepage-slider">
                            {
                                pageContent[12]?.bannerItem.map((banner, index) => {
                                    return <div className="item" key={index}>
                                        <a href={banner.hyperlink}>
                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${banner.bannerImageDesktop.url}`}
                                                className="img-fluid" alt={banner.title} />
                                        </a>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </section>
                <section className="d-lg-none d-block" >
                    <div className="container-wrapper">
                        <div className="owl-carousel owl-theme homepage-slider">
                            {
                                pageContent[12]?.bannerItem.map((banner, index) => {
                                    return <div className="item" key={index}>
                                        <a href={banner.hyperlink}>
                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${banner.bannerImageMobile.url}`}
                                                className="img-fluid" alt={banner.title} />
                                        </a>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </section>
            </div>


            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 mb-4">
                            <div className="sticky-left">
                                <div className="find-doctor-left-col">
                                    <div className="row">
                                        <div className="tab-group d-md-block d-none text-center mb-3 main-heading sub-heading main-list">
                                            <h3 className="text-start">Department of Academics</h3>
                                            <button type="button" className="btn-tab treat-tab py-3 active omega"
                                                onClick={() => {
                                                    showBox('omega');
                                                    setPageTitle("About Academics")
                                                }}>
                                                About Academics
                                            </button>

                                            <button type="button" className="btn-tab treat-tab py-3 omega1"
                                                onClick={() => {
                                                    showBox('omega1');
                                                    setPageTitle("Academic Leaders")
                                                }}>
                                                Academic Leaders
                                            </button>

                                            <button type="button" className="btn-tab treat-tab py-3 omega2"
                                                onClick={() => {
                                                    showBox('omega2');
                                                    setPageTitle("Courses We Offer")
                                                }}>
                                                Courses We Offer
                                            </button>

                                            <button type="button" className="btn-tab treat-tab py-3 omega3"
                                                onClick={() => window.location.href = `${baseUrl}/rank-holders`}>
                                                Rank Holders
                                            </button>

                                            <button type="button" className="btn-tab treat-tab py-3 omega4"
                                                onClick={() => {
                                                    showBox('omega4');
                                                    setPageTitle("Scientific Publications")
                                                }}>
                                                Scientific Publications
                                            </button>
                                            <button type="button" className="btn-tab treat-tab py-3 omega5"
                                                onClick={() => window.location.href = `${baseUrl}/skills-and-simulation-lab`}>
                                                Skills & Simulation Lab
                                            </button>
                                            <button type="button" className="btn-tab treat-tab py-3 omega6"
                                                onClick={() => window.location.href = `${baseUrl}/international-training-programs`}>
                                                International Training
                                            </button>
                                            <button type="button" className="btn-tab treat-tab py-3 omega7"
                                                onClick={() => window.location.href = `${baseUrl}/outstanding-research-work`}>
                                                Research Work
                                            </button>
                                            <button type="button" className="btn-tab treat-tab py-3 omega8"
                                                onClick={() => window.location.href = `${baseUrl}/our-alumini`}>
                                                Our Alumni
                                            </button>
                                            <button type="button" className="btn-tab treat-tab py-3 omega9"
                                                onClick={() => {
                                                    showBox('omega9');
                                                    setPageTitle("Gallery");
                                                }}>
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
                                                    setDrpValue(value);

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
                                                        showBox('omega' + e.target.value)

                                                    if (value === "") {
                                                        setPageTitle("About Academics")
                                                    }
                                                    else if (value === "1") {
                                                        setPageTitle("Academic Leaders")
                                                    }
                                                    else if (value === "2") {
                                                        setPageTitle("Courses We Offer")
                                                    }
                                                    else if (value === "4") {
                                                        setPageTitle("Scientific Publications")
                                                    }
                                                    else if (value === "9") {
                                                        setPageTitle("Gallery")
                                                    }
                                                }}
                                            >
                                                <option value="">About Academic</option>
                                                <option value="1">Academic Leaders</option>
                                                <option value="2">Courses We Offer</option>
                                                <option value="3">Rank Holders</option>
                                                <option value="4">Scientific Publications</option>
                                                <option value="5">Skills & Simulation Lab</option>
                                                <option value="6">International Training</option>
                                                <option value="7">Research Work</option>
                                                <option value="8">Our Alumni</option>
                                                <option value="9">Gallery</option>
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
                            <div className="treat-box" id="omega" style={{ display: "none" }}>
                                <div className="container main-heading sub-heading main-list">
                                    <h2>{pageContent[2]?.title}</h2>
                                    <div className="row">

                                        <div className="col-md-12 sub-heading mb-lg-0 mb-3">
                                            <div className='text-justify' dangerouslySetInnerHTML={{ __html: marked(pageContent[2].details || "") || "" }}></div>
                                        </div>
                                        {/* <div className="col-md-5 ">
                                        <div className="association-left-col sticky-left">
                                            <img src={process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[2].image?.url} alt={pageContent[2]?.title} className="img-fluid rounded w-100" />
                                        </div>
                                    </div> */}
                                    </div>
                                </div>
                            </div>

                            <div className="treat-box" id="omega1" style={{ display: "none" }}>
                                <div className="container">
                                    {
                                        pageContent[1].contentCard.slice(0, 1).map((d, i) => {
                                            return <div className="col-12">
                                                <div className="card mb-3">
                                                    <div className="row g-0">
                                                        <div className="col-md-4">
                                                            <img
                                                                src={d.image?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${d.image.url}` : '/img/no-image.jpg'}
                                                                className="img-fluid w-100 card-img"
                                                                alt={d.title}
                                                            />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div className="card-body sub-heading main-heading">
                                                                {/* <h5 className="card-title">{d.title}</h5> */}
                                                                <p
                                                                    className="card-text"
                                                                    dangerouslySetInnerHTML={{ __html: marked(d.details) }}
                                                                ></p>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        })
                                    }
                                    <div className="row">
                                        {
                                            pageContent[1].contentCard.slice(1, pageContent[1].contentCard.length).map((d, i) => {
                                                return <div className="col-3">
                                                    <div className="card mb-3">
                                                        <div className="card-body p-2 sub-heading main-heading">
                                                            <img
                                                                src={d.image?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${d.image.url}` : '/img/no-image.jpg'}
                                                                className="img-fluid w-100 card-img"
                                                                alt={d.title}
                                                            />
                                                            <p><strong>{d.title}</strong></p>
                                                            <p
                                                                className="card-text"
                                                                dangerouslySetInnerHTML={{ __html: marked(d.details) }}
                                                            ></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>

                                </div>
                            </div>

                            <div className="treat-box" id="omega2" style={{ display: "none" }}>
                                <div className="container">
                                    <div className="main-heading sub-heading main-list course-we-offer-section-new">
                                        <h2>{pageContent[3]?.title}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: pageContent[3]?.details || "" }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="treat-box" id="omega4" style={{ display: "none" }}>
                                <div className="container">
                                    <div className="main-heading">
                                        <h2>{pageContent[6].title}</h2>
                                    </div>

                                    {pageContent[6].title && (
                                        <div className="faq-card scientyfic-proceding-faq p-4">
                                            <div className="accordion" id="accordionExample">
                                                {pageContent[6].socomer?.map((sp, i) => (
                                                    <div className="accordion-item" key={i}>
                                                        <h2 className="accordion-header">
                                                            <button className={`accordion-button ${i === 0 ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`}
                                                                aria-expanded={`${i === 0 ? "true" : "false"}`} aria-controls={`collapse${i}`}>
                                                                <span>{sp.title}</span>
                                                            </button>
                                                        </h2>
                                                        <div id={`collapse${i}`} className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`} data-bs-parent="#accordionExample">
                                                            <div className="accordion-body main-list">
                                                                <ul>
                                                                    {sp.socomerItem.map((spI, j) => (
                                                                        <li key={j}>

                                                                            <a
                                                                                href={
                                                                                    spI.file?.url
                                                                                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${spI.file.url}`
                                                                                        : `${baseUrl}/${spI.link}`
                                                                                }
                                                                            >
                                                                                {/* <i className="custom-download"></i> */}
                                                                                <u>{spI.title}</u>
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>



                                                ))}
                                            </div>
                                        </div>

                                    )}

                                </div>
                            </div>

                            <div className="treat-box" id="omega9" style={{ display: "none" }}>
                                <div className="container">
                                    <div className="row justify-content-between" data-aos="fade-right">
                                        <div className="col-md-4 col-8">
                                            <div className="main-heading">
                                                <h2>{pageContent[10]?.title}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <AcademicGalleryViewer pageContent={pageContent} />
                                </div>
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
        </>

    )
}

export default AcademicTab