import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import getHealthPackageData from '@/app/lib/getHealthPackage';
import { marked } from 'marked';



const HealthPackage = async ({ searchParams }) => {
    const URLParams = await searchParams;
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const staticText = await getStaticText();

    const allHealthPackage = await getHealthPackageData.getAll({ langLoc: getLangLoc, URLParams: URLParams });

    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="healthpackage-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>Health Packages</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={staticText['Health Packages']}
                                        middleTitle={''}
                                        middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-6">
                                    <div className="main-heading">
                                        <h2>{allHealthPackage.length} {staticText['Health Packages Found']}</h2>
                                    </div>
                                </div>
                                <div className="col-6 d-lg-none d-block">
                                    <button type="button" className="btn-tab form-btn mx-2 filter-box-mobile">Filters <i
                                        className="fa-solid fa-filter"></i></button>
                                </div>
                            </div>

                            <div className="row">
                                {/* <div className="col-md-3 mb-4">
                                    <div className="find-doctor-left-col filter-form">
                                        <h4>Select Filters</h4>
                                        <div className="find-doc-box">
                                            <h3>By Hospital</h3>
                                            <div className="rounded-field-form mb-3">
                                                <form action="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control" placeholder="Search ....."
                                                                    name="search" />
                                                                <span className="input-group-text"><i
                                                                    className="fa-solid fa-magnifying-glass"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div className="option-find-doc">
                                                    <ul>
                                                        <li>Trivandrum </li>
                                                        <li>Trivandrum </li>
                                                        <li>Trivandrum </li>
                                                        <li>Trivandrum </li>
                                                        <li>Trivandrum </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="find-doc-box">
                                            <h3>By Specialities</h3>
                                            <div className="rounded-field-form mb-3">
                                                <form action="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control" placeholder="Search ....."
                                                                    name="search" />
                                                                <span className="input-group-text"><i
                                                                    className="fa-solid fa-magnifying-glass"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div className="option-find-doc">
                                                    <ul>
                                                        <li>Oncology </li>
                                                        <li>Oncology </li>
                                                        <li>Oncology </li>
                                                        <li>Oncology </li>
                                                        <li>Oncology </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>




                                        <div className="find-doc-box">
                                            <h3>By Conditions</h3>
                                            <div className="rounded-field-form mb-3">
                                                <form action="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="input-group">
                                                                <select className="form-select" aria-label="Default select example">
                                                                    <option value={""}>Conditions</option>
                                                                    <option value="1">One</option>
                                                                    <option value="2">Two</option>
                                                                    <option value="3">Three</option>
                                                                </select>
                                                                <span className="input-group-text"><i
                                                                    className="fa-solid fa-chevron-down"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div className="option-find-doc">
                                                    <ul>
                                                        <li>Arthritis</li>
                                                        <li>Arthritis </li>
                                                        <li>Arthritis </li>
                                                        <li>Arthritis </li>
                                                        <li>Arthritis </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="find-doc-box">
                                            <h3>By Lifestyle Disorders</h3>
                                            <div className="rounded-field-form mb-3">
                                                <form action="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control" placeholder="Search ....."
                                                                    name="search" />
                                                                <span className="input-group-text"><i
                                                                    className="fa-solid fa-magnifying-glass"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div className="option-find-doc">
                                                    <ul>
                                                        <li>Lung </li>
                                                        <li>Lung </li>
                                                        <li>Lung </li>
                                                        <li>Lung </li>
                                                        <li>Lung </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="find-doc-box">
                                            <h3>By Gender</h3>
                                            <div className="rounded-field-form mb-3">
                                                <form action="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control" placeholder="Search ....."
                                                                    name="search" />
                                                                <span className="input-group-text"><i
                                                                    className="fa-solid fa-magnifying-glass"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div className="option-find-doc h-auto">
                                                    <ul>
                                                        <li>Male </li>
                                                        <li>Female </li>
                                                        <li>Transgender </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="find-doc-box">
                                            <h3>By Age</h3>
                                            <div className="rounded-field-form mb-3">
                                                <form action="">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="input-group">
                                                                <input type="text" className="form-control" placeholder="Search ....."
                                                                    name="search" />
                                                                <span className="input-group-text"><i
                                                                    className="fa-solid fa-magnifying-glass"></i></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div className="option-find-doc h-auto">
                                                    <ul>
                                                        <li> Pediatric </li>
                                                        <li> Pediatric </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <a href="#" className="form-btn d-block text-center">Get Report</a>

                                        </div>



                                        <div className="find-doc-box">
                                            <h3>Need Help Making an Appointment?</h3>
                                            <div className="rounded-field-form mb-3">
                                                <form action="">
                                                    <div className="row">
                                                        <div className="col-12 mb-3">
                                                            <label className="form-label">Name <span>*</span></label>
                                                            <input type="text" className="form-control" placeholder="Enter your name"
                                                                name="name" />
                                                        </div>

                                                        <div className="col-12 mb-3">
                                                            <label className="form-label">Mobile Number <span>*</span></label>
                                                            <input type="text" className="form-control" placeholder="000 000 0000"
                                                                name="name" />
                                                        </div>

                                                        <div className="col-12 mb-3">
                                                            <button className="form-btn">Submit</button>
                                                        </div>
                                                    </div>
                                                </form>


                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="col-md-12 health-pack-details-main-page">
                                    <div className="row">
                                        {
                                            allHealthPackage.map((data, index) => {
                                                return <div className="col-md-3 col-6 mb-3" key={index}>
                                                    <div className="custom-hospital-top-card">
                                                        <div className="hospital-img">
                                                            <a href={basePath + "/health-package/" + data.slug}><img src={data.featuredImage ? process.env.NEXT_PUBLIC_IMAGE_URL + data.featuredImage.url : "/img/no-image.jpg"} alt={data?.title}
                                                                className="img-fluid w-100" /></a>
                                                        </div>
                                                        <div className="hospital-content">
                                                            <h3>{data?.title}</h3>
                                                            <p>{data?.noOfTest} {staticText['tests included']}</p>
                                                            <div className="main-list" dangerouslySetInnerHTML={{ __html: marked(data?.shortDetails || "") || "" }}>
                                                            </div>
                                                            <div className="d-lg-flex d-block align-items-center justify-content-between py-2 ">
                                                                <div className="hospital-content p-0">
                                                                    <ul>
                                                                        <li className="location-icon-custom h-auto">{data?.hospitals[0]?.title}</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <ul>
                                                                        <li>{data?.price}/-</li>
                                                                    </ul>
                                                                </div>
                                                            </div>

                                                            <div className="d-lg-flex d-block align-items-center justify-content-between pt-3">
                                                                <a href={basePath + "/health-package/" + data.slug} className="btn mb-lg-0 mb-2 hospital-primarybtn">{staticText['View Details']}</a>
                                                                <a href={basePath + "/health-package/" + data.slug+"#book-now"} className="btn mb-lg-0 mb-3 hospital-secondarybtn">{staticText['Book Now']}</a>
                                                            </div>
                                                        </div>



                                                    </div>

                                                </div>
                                            })

                                        }



                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default HealthPackage