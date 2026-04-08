import React from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import Breadcrumb from '@/components/Breadcrumb';
import getStaticText from '@/app/lib/getStaticTextServer';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import { marked } from 'marked';
import OtherAcademic from '@/components/OtherAcademic';


const OutStandingResearchWork = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const data = await getStaticPageContent("outstanding-research-work");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticTexts = await getStaticText();


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="find-doctor-main-page">
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
                                        middleTitle={""} middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    <OtherAcademic highlight={'research'} pageContent={pageContent} baseUrl={basePath} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default OutStandingResearchWork;
