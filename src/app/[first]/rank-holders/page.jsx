import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import Breadcrumb from '@/components/Breadcrumb';
import getStaticText from '@/app/lib/getStaticTextServer';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import OtherAcademic from '@/components/OtherAcademic';


const RankHolders = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const field = "populate[0]=pageContent&populate[1]=pageContent.contentCard&populate[2]=pageContent.contentCard.image";
    const data = await getStaticPageContent("rank-holders", field);
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
                                    <Breadcrumb activeTitle={pageContent[0]?.title} middleTitle={""} middleURL={""} />
                                </div>
                            </div>
                        </div>
                    </section>
                    <OtherAcademic
                        pageContent={pageContent}
                        baseUrl={basePath}
                        highlight={"rank-holder"}
                    />

                    
                </div>
            </div>
            <Footer />
        </>
    )
}

export default RankHolders;
