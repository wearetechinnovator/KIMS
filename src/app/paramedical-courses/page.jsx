import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent'
import { getBaseUrl } from '@/app/lib/getBaseUrl'
import getStaticText from '@/app/lib/getStaticTextServer'
import courseData from '@/app/lib/getCourse';
import Form1 from '@/components/Forms/Form1';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import CourseButton from '@/components/CourseButton';



const ParamedicalCourse = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection&populate[5]=pageContent.courseCategory";
    const data = await getStaticPageContent("paramedical-courses", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();

    let allDiplomaCourses = await courseData.getAll({
        id: pageContent[3].courseCategory?.id,
        langLoc: getLangLoc
    });


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="paramedical-main-page">
                    <section className="section details-page-before py-0">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-lg-0">
                                                        <Breadcrumb
                                                            activeTitle={pageContent[0]?.title}
                                                            middleTitle={"Academics"}
                                                            middleURL={basePath + "#"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3>{pageContent[0].title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={pageContent[1].bannerItem.length > 0 ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[1].bannerItem[0]?.bannerImageDesktop?.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt={pageContent[0].title} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                    <section className="section doctor-line-divider">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <section className="section pt-0">
                                        <div className="main-heading sub-heading">
                                            <h2>{pageContent[2].title}</h2>
                                            <div dangerouslySetInnerHTML={{ __html: pageContent[2].details || "" }}></div>
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>


                                    <section className="section">
                                        <div className="main-heading">
                                            <h2>{pageContent[3].title}
                                            </h2>
                                        </div>
                                        <div className="row">
                                            {
                                                allDiplomaCourses.map((l, i) => {
                                                    return <div className="col-md-6 mb-3" key={i}>
                                                        <div className="doctoral-card-content">
                                                            <h3 className="text-dark">{l.title}</h3>
                                                            <ul>
                                                                {l.duration && <li className="hourglass">{staticText['Duration']}: {l.duration}</li>}
                                                                {l.eligibility && <li className="luxury">{staticText['Eligibility']}: {l.eligibility} </li>}
                                                                {l.commencement && <li className="calender-doc">
                                                                    {staticText['Commencement']}: {l.commencement}</li>}
                                                                {l.noOfSeat && <li className="car-seat">{staticText['No of seat']}: {l.noOfSeat}</li>}
                                                            </ul>
                                                            <CourseButton corseCategory={l.courseCategory.title} courseName={l.title}/>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </section>
                                </div>

                                <div className="col-md-4">
                                    <div className="association-left-col sticky-left">
                                        <div className="association-form-card mb-5">
                                            <Form1 title={"Request a Call Back"} type={"Paramedical courses"}/>
                                        </div>
                                        <h4>{pageContent[4].sectionTitle}</h4>
                                        <p><strong>{pageContent[4].contactPerson}</strong></p>
                                        <p>{pageContent[4].designation}</p>
                                        <p>{pageContent[4].address}</p>
                                        <a href={"tel:" + pageContent[4].phone}>
                                            <i className="fa-solid fa-phone"></i> {pageContent[4].phone}
                                        </a>
                                        <a href={"mailto:" + pageContent[4].email}>
                                            <i className="fa-solid fa-envelope"></i>{pageContent[4].email}
                                        </a>
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

export default ParamedicalCourse