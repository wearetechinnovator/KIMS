import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import testimonialData from '@/app/lib/getTestimonial'
import { getBaseUrl } from '@/app/lib/getBaseUrl'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer'
import TestimonialListing from '@/components/TestimonialListing'
import Breadcrumb from '@/components/Breadcrumb'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'
import PatientStoriesListing from '@/components/PatientStoriesListing'



const PtientStories = async ({ searchParams }) => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const data = await getStaticPageContent("patient-stories");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();
    const URLParams = await searchParams;


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="doctor-talk-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent[0]?.title}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={pageContent[0]?.title}
                                        middleTitle={""}
                                        middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <PatientStoriesListing
                        basePath={basePath}
                        langLoc={getLangLoc}
                        URLParams={URLParams}
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default PtientStories;
