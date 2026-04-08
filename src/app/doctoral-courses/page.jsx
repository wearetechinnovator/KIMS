import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react';
import getStaticText from '@/app/lib/getStaticTextServer';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import courseData from '@/app/lib/getCourse';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import CourseButton from '@/components/CourseButton';



const DoctoralCourse = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true)
    const staticText = await getStaticText();
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection&populate[5]=pageContent.journal&populate[6]=pageContent.journal.thumbnailImage&populate[7]=pageContent.journal.file&populate[8]=pageContent.file&populate[9]=pageContent.courseCategory";
    const data = await getStaticPageContent("doctoral-courses", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;

    let allDoctoralCourses = await courseData.getAll({ id: pageContent[2].courseCategory?.id, langLoc: getLangLoc });
    let allPhdCourses = await courseData.getAll({ id: pageContent[3].courseCategory?.id, langLoc: getLangLoc });
    let allPostDiplomaCourses = await courseData.getAll({ id: pageContent[4].courseCategory?.id, langLoc: getLangLoc })
    let allBroadCourses = await courseData.getAll({ id: pageContent[5].courseCategory?.id, langLoc: getLangLoc })
    let alltFelowshipCourses = await courseData.getAll({ id: pageContent[6].courseCategory?.id, langLoc: getLangLoc })

    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="doctoral-courses-main-page">
                    <section className="section details-page-before py-0">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <Breadcrumb
                                                            activeTitle={pageContent[0]?.title}
                                                            middleTitle={staticText['Academics']}
                                                            middleURL={basePath + "#"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3 className="mb-2">{pageContent[0].title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={pageContent[1]?.bannerItem[0]?.bannerImageDesktop?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[1].bannerItem[0].bannerImageDesktop.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt={pageContent[0].title} />
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
                                        <div className="main-heading">
                                            <h2>{pageContent[2].title}</h2>
                                        </div>

                                        <div className="row">
                                            {
                                                allDoctoralCourses?.map((l, i) => {
                                                    return <div className="col-md-4 mb-3" key={i}>
                                                        <div className="procedure-acc-card mb-3">
                                                            <div className="accordion" id="accordionExample">
                                                                <div className="accordion-item">
                                                                    <h2 className="accordion-header">
                                                                        <button className={`accordion-button ${i > 2 ? "collapsed" : ""}`} type="button"
                                                                            data-bs-toggle="collapse" data-bs-target={"#collapse" + i}
                                                                            aria-expanded="true" aria-controls={"collapse" + i}>
                                                                            <span>{l.title}</span>
                                                                        </button>
                                                                    </h2>
                                                                    <div id={"collapse" + i} className={`accordion-collapse collapse ${i <= 2 ? "show" : ""}`}>
                                                                        <div className="accordion-body main-list px-0 pt-0">
                                                                            {l.affiliation && <p>{staticText['Certified by']}: {l.affiliation}</p>}
                                                                            <ul>
                                                                                {l.duration && <li className="hourglass">{staticText['Duration']} : {l.duration}</li>}
                                                                                {l.eligibility && <li className="luxury">{staticText['Eligibility']} : {l.eligibility}</li>}
                                                                                {l.commencement && <li className="calender-doc">
                                                                                    {staticText['Commencement']} : {l.commencement}
                                                                                </li>}
                                                                            </ul>
                                                                            <CourseButton corseCategory={l.courseCategory.title} courseName={l.title}/>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="main-heading">
                                            <h2>{pageContent[3].title}</h2>
                                        </div>
                                        <div className="row">
                                            {
                                                allPhdCourses?.map((l, i) => {
                                                    return <div className="col-md-4 mb-3" key={i}>
                                                        <div className="procedure-acc-card mb-3">
                                                            <div className="accordion" id="accordionExample">
                                                                <div className="accordion-item">
                                                                    <h2 className="accordion-header">
                                                                        <button className={`accordion-button ${i > 2 ? "collapsed" : ""}`} type="button"
                                                                            data-bs-toggle="collapse" data-bs-target={"#collapse1" + i}
                                                                            aria-expanded="true" aria-controls={"collapse1" + i}>
                                                                            <span>{l.title}</span>
                                                                        </button>
                                                                    </h2>
                                                                    <div id={"collapse1" + i} className={`accordion-collapse collapse ${i <= 2 ? "show" : ""}`}>
                                                                        <div className="accordion-body main-list px-0 pt-0">
                                                                            {l.affiliation && <p>{staticText['Certified by']}: {l.affiliation}</p>}
                                                                            <ul>
                                                                                {l.duration && <li className="hourglass">{staticText['Duration']} : {l.duration}</li>}
                                                                                {l.eligibility && <li className="luxury">{staticText['Eligibility']} : {l.eligibility}</li>}
                                                                                {l.commencement && <li className="calender-doc">
                                                                                    {staticText['Commencement']} : {l.commencement}
                                                                                </li>}
                                                                            </ul>
                                                                            <CourseButton corseCategory={l.courseCategory.title} courseName={l.title}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </section>

                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="main-heading">
                                            <h2>{pageContent[4].title}</h2>
                                        </div>
                                        <div className="row">
                                            {
                                                allPostDiplomaCourses?.map((l, i) => {
                                                    return <div className="col-md-4 mb-3" key={i}>
                                                        <div className="procedure-acc-card mb-3">
                                                            <div className="accordion" id="accordionExample">
                                                                <div className="accordion-item">
                                                                    <h2 className="accordion-header">
                                                                        <button className={`accordion-button ${i > 2 ? "collapsed" : ""}`} type="button"
                                                                            data-bs-toggle="collapse" data-bs-target={"#collapse2" + i}
                                                                            aria-expanded="true" aria-controls={"collapse2" + i}>
                                                                            <span>{l.title}</span>
                                                                        </button>
                                                                    </h2>
                                                                    <div id={"collapse2" + i} className={`accordion-collapse collapse ${i <= 2 ? "show" : ""}`}>
                                                                        <div className="accordion-body main-list px-0 pt-0">
                                                                            {l.affiliation && <p>{staticText['Certified by']}: {l.affiliation}</p>}
                                                                            <ul>
                                                                                {l.duration && <li className="hourglass">{staticText['Duration']} : {l.duration}</li>}
                                                                                {l.eligibility && <li className="luxury">{staticText['Eligibility']} : {l.eligibility}</li>}
                                                                                {l.commencement && <li className="calender-doc">
                                                                                    {staticText['Commencement']} : {l.commencement}
                                                                                </li>}
                                                                            </ul>
                                                                            <CourseButton corseCategory={l.courseCategory.title} courseName={l.title}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading">
                                                <h2>{pageContent[5].title}</h2>
                                            </div>
                                            <div className="row">
                                                {
                                                    allBroadCourses?.map((l, i) => {
                                                        return <div className="col-md-4 mb-3" key={i}>
                                                            <div className="procedure-acc-card mb-3">
                                                                <div className="accordion" id="accordionExample">
                                                                    <div className="accordion-item">
                                                                        <h2 className="accordion-header">
                                                                            <button className={`accordion-button ${i > 2 ? "collapsed" : ""}`} type="button"
                                                                                data-bs-toggle="collapse" data-bs-target={"#collapse3" + i}
                                                                                aria-expanded="true" aria-controls={"collapse3" + i}>
                                                                                <span>{l.title}</span>
                                                                            </button>
                                                                        </h2>
                                                                        <div id={"collapse3" + i} className={`accordion-collapse collapse ${i <= 2 ? "show" : ""}`}>
                                                                            <div className="accordion-body main-list px-0 pt-0">
                                                                                {l.affiliation && <p>{staticText['Certified by']}: {l.affiliation}</p>}
                                                                                <ul>
                                                                                    {l.duration && <li className="hourglass">{staticText['Duration']} : {l.duration}</li>}
                                                                                    {l.eligibility && <li className="luxury">{staticText['Eligibility']} : {l.eligibility}</li>}
                                                                                    {l.commencement && <li className="calender-doc">
                                                                                        {staticText['Commencement']} : {l.commencement}
                                                                                    </li>}
                                                                                </ul>
                                                                                <CourseButton corseCategory={l.courseCategory.title} courseName={l.title}/>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </section>

                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading">
                                                <h2>{pageContent[6].title}</h2>
                                            </div>
                                            <div className="row">
                                                {
                                                    alltFelowshipCourses?.map((l, i) => {
                                                        return <div className="col-md-4 mb-3" key={i}>
                                                            <div className="procedure-acc-card mb-3">
                                                                <div className="accordion" id="accordionExample">
                                                                    <div className="accordion-item">
                                                                        <h2 className="accordion-header">
                                                                            <button className={`accordion-button ${i > 2 ? "collapsed" : ""}`} type="button"
                                                                                data-bs-toggle="collapse" data-bs-target={"#collapse4" + i}
                                                                                aria-expanded="true" aria-controls={"collapse4" + i}>
                                                                                <span>{l.title}</span>
                                                                            </button>
                                                                        </h2>
                                                                        <div id={"collapse4" + i} className={`accordion-collapse collapse ${i <= 2 ? "show" : ""}`}>
                                                                            <div className="accordion-body main-list px-0 pt-0">
                                                                                {l.affiliation && <p>{staticText['Certified by']}: {l.affiliation}</p>}
                                                                                <ul>
                                                                                    {l.duration && <li className="hourglass">{staticText['Duration']} : {l.duration}</li>}
                                                                                    {l.eligibility && <li className="luxury">{staticText['Eligibility']} : {l.eligibility}</li>}
                                                                                    {l.commencement && <li className="calender-doc">
                                                                                        {staticText['Commencement']} : {l.commencement}
                                                                                    </li>}
                                                                                </ul>
                                                                                <CourseButton corseCategory={l.courseCategory.title} courseName={l.title}/>
                                                                            </div>
                                                                        </div>
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

                                <div className="col-md-4">
                                    <div className="doctoral-page-right-card">
                                        <div className="doctoral-card-content">
                                            <h3>{pageContent[7].title}</h3>
                                            <a download target='_blank' href={process.env.NEXT_PUBLIC_IMAGE_URL + pageContent[7].file?.url} className="doctotal-btn">{pageContent[7].buttonText}</a>
                                        </div>

                                        <div className="procedure-acc-card my-3">
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                            data-bs-target="#collapse32" aria-expanded="true"
                                                            aria-controls="collapse32">
                                                            <span>{pageContent[8].title}</span>
                                                        </button>
                                                    </h2>
                                                    <div id="collapse32" className="accordion-collapse show ">
                                                        <div className="accordion-body px-0 pt-0" dangerouslySetInnerHTML={{ __html: pageContent[8].details || "" }}>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="procedure-acc-card my-3">
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button"
                                                            data-bs-toggle="collapse" data-bs-target="#collapse33"
                                                            aria-expanded="true" aria-controls="collapse33">
                                                            <span>{pageContent[9].title}</span>
                                                        </button>
                                                    </h2>
                                                    <div id="collapse33" className="accordion-collapse collapse ">
                                                        <div className="accordion-body px-0 pt-0" dangerouslySetInnerHTML={{ __html: pageContent[9].details || "" }}>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="procedure-acc-card my-3">
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item">
                                                    <h2 className="accordion-header">
                                                        <button className="accordion-button collapsed" type="button"
                                                            data-bs-toggle="collapse" data-bs-target="#collapse34"
                                                            aria-expanded="true" aria-controls="collapse34">
                                                            <span>{pageContent[10].title}</span>
                                                        </button>
                                                    </h2>
                                                    <div id="collapse34" className="accordion-collapse collapse  ">
                                                        <div className="accordion-body px-0 pt-0"
                                                            dangerouslySetInnerHTML={{ __html: pageContent[10].details || "" }}>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
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

export default DoctoralCourse