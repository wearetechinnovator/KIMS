import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import Breadcrumb from '@/components/Breadcrumb';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import getStaticText from '@/app/lib/getStaticTextServer';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import SecondOpinionForm from '@/components/Forms/SecondOpinionForm';

const SecondOpinion = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = getBaseUrl(true, true,)
    const data = await getStaticPageContent("second-opinion");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
     const staticText = await getStaticText();


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
                                    <Breadcrumb activeTitle={pageContent[0]?.title}
                                        middleTitle={""}
                                        middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <SecondOpinionForm pageContent={pageContent}/>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SecondOpinion;

