import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';


const EwsServices = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const data = await getStaticPageContent("ews-services");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();



    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="patients-and-visitors-main-page">
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
                                        middleTitle={''}
                                        middleURL={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[1]?.title}</h2>
                                <div
                                    dangerouslySetInnerHTML={{ __html: pageContent[1]?.details || "" }}
                                >
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading">
                                <h2>{pageContent[2]?.title}</h2>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{ __html: pageContent[2]?.details || "" }}
                                className="table-responsive services-table mt-4">
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EwsServices;

