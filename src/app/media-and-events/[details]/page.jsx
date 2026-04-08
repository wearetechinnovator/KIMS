import formatDate from '@/app/lib/formatDate'
import { getBaseUrl } from '@/app/lib/getBaseUrl'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'
import mediaData from '@/app/lib/getMediaEvent'
import getStaticText from '@/app/lib/getStaticTextServer'
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { marked } from 'marked'
import React from 'react'

const MediaAndEventsDetails = async ({ params }) => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const staticText = await getStaticText();
    const data = await mediaData.getSingleMedia({slug: params.details, langLoc: getLangLoc});
    const recentMedia = await mediaData.getRecentMedia({langLoc: getLangLoc})


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="media-details-main-page">
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
                                                            activeTitle={data.title}
                                                            middleTitle={staticText["Media & Events"]}
                                                            middleURL={basePath + "/media-and-events"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3 className="mb-2">{data.speaker?.title}</h3>

                                                    {
                                                        data.speaker?.speaker?.map((sp, i) => {
                                                            return <ul key={i} className={`${i > 0 ? "mt-3" : ""}`}>
                                                                <li className="hospital-doctor">{staticText['By']}: {sp.by} </li>
                                                                <li className="chat-ic">{staticText['Topic']}: {sp.topic}</li>
                                                                <li className="hospital-icon-custom">{sp.hospitalName} </li>
                                                            </ul>
                                                        })
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={data.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + data.featuredImage?.url : '/img/no-image.jpg'} className="img-fluid details-banner-image" alt={data.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="section">
                        <div className="container">
                            <div className="date-heading main-heading sub-heading">
                                <ul>
                                    <li className="calender-doc mb-2">{formatDate(data.date)}</li>
                                </ul>
                                <h3 className="mb-4">{data.title}</h3>
                                <div dangerouslySetInnerHTML={{ __html: marked(data.details) || "" }}></div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"> </div>

                    <section className="section d-lg-block d-none">
                        <div className="container">
                            <div className="row justify-content-between" data-aos="fade-right">
                                <div className="col-md-6 col-8">
                                    <div className="main-heading">
                                        <h2>{data.mediaSection?.title}</h2>
                                    </div>
                                </div>
                                <div className="col-md-2 col-4">
                                    <div className="over-all-btn text-end">
                                        <a href={basePath + "/media-and-events"}>{staticText['View All']} <span><img src="/img/slider-right-arrow.svg" className="img-fluid"
                                            alt="" /></span></a>
                                    </div>
                                </div>
                            </div>

                            <div className="owl-carousel owl-theme blog">

                                {
                                    recentMedia.map((rm, i) => {
                                        return <div className="media-card" data-aos="fade-right" data-aos-duration="2200" data-aos-delay="100" key={i}>
                                            <div className="media-img">
                                                <a href={basePath + "/media-and-events/" + rm.slug}>
                                                    <img
                                                        src={rm.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + rm.featuredImage?.url : '/img/no-image.jpg'}
                                                        className="img-fluid w-100"
                                                        alt={rm.title}
                                                    />
                                                </a>
                                            </div>
                                            <div className="media-content">
                                                <p>{rm.shortDetails}</p>
                                                <div>
                                                    <div className="d-flex align-items-center justify-content-between mt-3">
                                                        <div className="media-name">
                                                            <div>
                                                                <img src="/img/kims-small-logo.png" className="img-fluid" alt="" />
                                                            </div>
                                                            <p><a href={basePath + "/media-and-events/" + rm.slug}><strong>{rm.title}</strong></a> <br /> {formatDate(rm?.date)}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    })
                                }
                            </div>
                            <div className="row g-2">

                            </div>

                        </div>
                    </section>

                    {/* Mobiel view */}
                    <section className="section d-lg-none d-block" data-aos="fade-up">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-md-4 col-8">
                                    <div className="main-heading">
                                        <h2>{data.mediaSection?.title}</h2>
                                    </div>
                                </div>
                                <div className="col-md-2 col-4">
                                    <div className="over-all-btn text-end">
                                        <a href={basePath + "/media-and-events"}>{staticText['View All']} <span><img src="/img/slider-right-arrow.svg" className="img-fluid"
                                            alt="" /></span></a>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2">

                                {
                                    recentMedia.map((e, i) => (
                                        <div className="col-xl-3 col-lg-3 col-md-3 col-6 mb-2" key={i}>
                                            <div className="media-card">
                                                <div className="media-img">
                                                    <a href={basePath + "/media-and-events/" + e.slug}>
                                                        <img
                                                            src={e.featuredImage?.url ? process.env.NEXT_PUBLIC_IMAGE_URL + e.featuredImage?.url : '/img/no-image.jpg'}
                                                            className="img-fluid w-100"
                                                            alt=""
                                                        />
                                                    </a>
                                                </div>
                                                <div className="media-content">
                                                    <p>{e.shortDetails}</p>
                                                    <div className="d-block align-items-center justify-content-between mt-3">
                                                        <div className="media-name">
                                                            <div>
                                                                <img src="/img/kims-small-logo.png" className="img-fluid" alt="" />
                                                            </div>
                                                            <p>
                                                                <a href={basePath + "/media-and-events/" + e.slug}><strong>{e.title}
                                                                </strong></a>
                                                            </p>
                                                        </div>
                                                        <p className="mt-2 ms-4 ps-3">{formatDate(e?.date)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                            </div>

                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MediaAndEventsDetails