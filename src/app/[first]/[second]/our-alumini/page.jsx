import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import { marked } from 'marked';
import AcademicTab from '@/components/AcademicTab';
import OtherAcademic from '@/components/OtherAcademic';


const OurAlumini = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const data = await getStaticPageContent("our-alumini");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText()


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="faq-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent ? pageContent[0]?.title : null}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={pageContent[0]?.title}
                                        middleTitle={''}
                                        middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    <OtherAcademic highlight={"alumini"} pageContent={pageContent} baseUrl={basePath} />



                </div>
            </div>
            <Footer />
        </>
    )
}

export default OurAlumini;