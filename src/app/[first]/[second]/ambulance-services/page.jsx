import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';

const AmbulanceServices = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const staticText = await getStaticText();
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection";
    const data = await getStaticPageContent("ambulance-services", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;

    
    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="emergency-medicine-main-page">

                    {/* Desktop section */}
                    <section className="section details-page-before py-0 d-lg-block d-none">
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
                                                            middleTitle={''}
                                                            middleURL={''}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3>{pageContent[0]?.title}</h3>
                                                    <div className="ambulace-number"><a href={"tel:" + pageContent[0]?.subTitle}><i className="fa-solid fa-phone"></i> {pageContent[0]?.subTitle} </a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col mt-lg-0 mt-4">
                                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${pageContent[1]?.bannerItem[0].bannerImageDesktop?.url}`} className="img-fluid details-banner-image" alt={pageContent[1]?.bannerItem[0]?.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* mobile section */}
                    <section className="section details-page-before py-0 d-lg-none d-block">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col mt-lg-auto">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <Breadcrumb
                                                            activeTitle={pageContent[0]?.title}
                                                            middleTitle={''}
                                                            middleURL={''}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-proceduce-banner-right-col mt-lg-0 mt-4">
                                                <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${pageContent[1]?.bannerItem[0].bannerImageDesktop?.url}`}
                                                    className="img-fluid details-banner-image" 
                                                    alt={pageContent[1].bannerItem[0]?.title} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-lg-0 mt-4">
                                    <div className="details-banner">
                                        <div className="details-heading">
                                            <h3>{pageContent[0].title}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="section">
                        <div className="container">
                            <div className="main-heading sub-heading">
                                <div dangerouslySetInnerHTML={{ __html: pageContent[2]?.details || '' }}></div>
                                <div className="ambulace-number">
                                    <a
                                        dangerouslySetInnerHTML={{ __html: `${pageContent[3]?.icon} ${pageContent[3]?.phone}` }}
                                        href={`tel:${pageContent[3]?.phone}`}>
                                    </a>
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

export default AmbulanceServices