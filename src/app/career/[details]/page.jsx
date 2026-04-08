import { getBaseUrl } from '@/app/lib/getBaseUrl';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import jobData from '@/app/lib/getJob';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer'
import JobForm from '@/components/Forms/JobForm';
import Header from '@/components/Header'
import { marked } from 'marked';
import React from 'react';



const CareerDetails = async ({ params }) => {
    const getLangLoc = await getCurrentLangLoc()
    const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
    const statictText = await getStaticText();
    const basePath = await getBaseUrl(true, true);
    const data = await jobData.getSingleJob({slug:params.details, langLoc: getLangLoc});


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="career-details-main-page">
                    <section className="section details-page-before py-0 d-lg-block d-none">
                        <div className="procedures-details-page-header inner-pages-header details-page-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <Breadcrumb
                                                            activeTitle={data?.title}
                                                            middleTitle={'Career'}
                                                            middleURL={basePath+"/career"}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner pt-lg-5 pt-4">
                                                <div className="details-heading">
                                                    <h3>{data?.title}</h3>
                                                    <p>{data?.hospitals[0]?.title}</p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={data.featuredImage?.url ? imgUrl + data.featuredImage?.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt={data?.title} />
                                    </div>

                                    {/* <!-- <div className="col-md-6">
                                        <img src="/img/details-banner.png" alt="" className="img-fluid w-100">
                                    </div> --> */}
                                </div>
                            </div>
                        </div>

                    </section>

                    <section className="section details-page-before py-0 d-lg-none d-block">
                        <div className="procedures-details-page-header inner-pages-header details-page-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <div className="breadcrumb-wrapper">
                                            <div className="row">
                                                <div className="col-12 px-0">
                                                        <Breadcrumb
                                                            activeTitle={data?.title}
                                                            middleTitle={'Career'}
                                                            middleURL={basePath+"/career"}
                                                        />
                                                </div>
                                            </div>
                                        </div>
                                        <img src={data.featuredImage?.url ? imgUrl + data.featuredImage?.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt={data?.title} />
                                    </div>
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">

                                            <div className="details-banner pt-lg-5 pt-4">
                                                <div className="details-heading">
                                                    <h3>{data?.title}</h3>
                                                    <p>{data?.hospitals[0]?.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                    <section className="section doctor-line-divider">
                        <div className="container">

                            <div className="row">
                                <div className="col-md-8 ps-lg-0 ">
                                    <section className="section pt-0">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list" 
                                            dangerouslySetInnerHTML={{__html: marked(data.details || "")}}>
                                            </div>
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list">
                                                <h2>{statictText['Education Qualification/Certification']}</h2>
                                                <ul>
                                                    <li>{data?.qualification}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list">
                                                <h2>{statictText['Requirements']}</h2>
                                                <div  
                                            dangerouslySetInnerHTML={{__html: marked(data.requirements || "")}}>
                                            </div>
                                            </div>
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>

                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list">
                                                <h2>{statictText['Job Description']}</h2>
                                                <div  
                                            dangerouslySetInnerHTML={{__html: marked(data.jobDescription || "")}}>
                                            </div>
                                                <h3 className="mt-4">{statictText['Apply at']}:</h3>
                                                <div className="ambulace-number"><a href={'mailto:'+data.applicationEmail} className="fs-6 text-dark fw-normal"><i
                                                    className="fa-solid fa-envelope"></i> {data.applicationEmail}</a></div>
                                            </div>
                                        </div>
                                    </section>



                                </div>

                                <div className="col-md-4">
                                    <div className="association-left-col sticky-from">
                                        <div className="association-form-card mb-5">
                                            <JobForm title={"Apply Now"} jobTitle={data?.title}/>
                                        </div>
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

export default CareerDetails