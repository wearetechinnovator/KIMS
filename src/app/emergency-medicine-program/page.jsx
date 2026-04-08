import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import Form1 from '@/components/Forms/Form1';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';

const EmergencyMedicine = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const field = "populate[0]=pageContent&populate[1]=pageContent.bannerItem&populate[2]=pageContent.bannerItem.bannerImageDesktop&populate[3]=pageContent.bannerItem.bannerImageMobile&populate[4]=metaSection";
    const data = await getStaticPageContent("emergency-medicine-program", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText()


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
                                                            middleURL={""}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3>{pageContent[0]?.title}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col mt-lg-0 mt-4">
                                        <img src={pageContent[1]?.bannerItem[0].bannerImageDesktop?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageContent[1]?.bannerItem[0].bannerImageDesktop?.url}` : '/img/no-image.jpg'} className="img-fluid details-banner-image" alt={pageContent[1]?.bannerItem[0]?.title} />
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
                                                        <ul className="breadcrumb mb-0">
                                                            <li>
                                                                <a href={basePath + "/"}>{staticText['Home']}</a>
                                                            </li>
                                                            <li className="active"> {pageContent[0]?.title} </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-proceduce-banner-right-col mt-lg-0 mt-4">
                                                <img src={pageContent[1]?.bannerItem[0].bannerImageDesktop?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${pageContent[1]?.bannerItem[0].bannerImageDesktop?.url}` : "/img/no-image.jpg"}
                                                    className="img-fluid details-banner-image" alt={pageContent[1]?.bannerItem[0].title} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-lg-0 mt-4">
                                    <div className="details-banner">
                                        <div className="details-heading">
                                            <h3>{pageContent[0]?.title}</h3>
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
                                            <div className="main-heading sub-heading">
                                                <h2>{pageContent[2]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[2]?.details }}></div>
                                            </div>
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading">
                                                <h2>{pageContent[3]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[3]?.details }}></div>
                                            </div>
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list">
                                                <h2>{pageContent[4]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[4]?.details }}></div>
                                            </div>
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list">
                                                <h2>{pageContent[5]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[5]?.details }}></div>
                                            </div>
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list">
                                                <h2>{pageContent[6]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[6]?.details }}></div>
                                            </div>
                                        </div>
                                    </section>
                                    <div className="line-divider"></div>
                                    <section className="section">
                                        <div className="container">
                                            <div className="main-heading sub-heading main-list">
                                                <h2>{pageContent[7]?.title}</h2>
                                                <div dangerouslySetInnerHTML={{ __html: pageContent[7]?.details }}></div>
                                            </div>
                                        </div>
                                    </section>
                                </div>

                                <div className="col-md-4">
                                    <div className="association-left-col">
                                        <div className="association-form-card mb-5">
                                            <Form1 title={"Request a Call Back"} type={"Emergency Medicine Programme"}/>
                                        </div>
                                        <div className="em-sticky-ele">
                                            <h4>{pageContent[8]?.sectionTitle}</h4>
                                            <p><strong>{pageContent[8]?.contactPerson}</strong></p>
                                            <p>{staticText['SOCOMER']}</p>
                                            <p> {pageContent[8]?.address}</p>
                                            <a href={"tel:" + pageContent[8]?.phone}>
                                                {pageContent[8]?.phone && <i className="fa-solid fa-phone"></i>}
                                                {pageContent[8]?.phone}
                                            </a>
                                            <a href={`mailto: ${pageContent[8]?.email}`}>
                                                {pageContent[8]?.email && <i className="fa-solid fa-envelope"></i>}
                                                {pageContent[8]?.email}</a>
                                            <div className="mt-3">
                                                <p> <strong>{pageContent[9]?.contactPerson}</strong> </p>
                                                <p> {pageContent[9]?.address}</p>
                                                <a href={`tel: ${pageContent[8]?.phone}`}>
                                                    {pageContent[8]?.phone && <i className="fa-solid fa-phone"></i>}
                                                    {pageContent[8]?.phone}</a>
                                                <a href={`mailto: ${pageContent[9]?.email}`}>
                                                    {pageContent[9]?.email && <i className="fa-solid fa-envelope"></i>}
                                                    {pageContent[9]?.email}
                                                </a>
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

export default EmergencyMedicine;

