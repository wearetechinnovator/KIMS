import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';



const EthicsCommittee = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const data = await getStaticPageContent("ethics-committee");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="ethics-committee-main-page">
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
                                <div dangerouslySetInnerHTML={{ __html: pageContent[1]?.details || "" }}></div>
                            </div>
                        </div>
                    </section>
                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[2]?.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: pageContent[2]?.details || "" }}></div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[3]?.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: pageContent[3]?.details || "" }}></div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[4]?.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: pageContent[4]?.details || "" }}></div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <div className="main-heading main-list sub-heading">
                                        <h2>{pageContent[5]?.title}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: pageContent[5]?.details || "" }}></div>
                                    </div>
                                </div>
                                <div className="col-md-6 my-lg-auto mb-3">
                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${pageContent[5]?.image?.url}`}
                                        className="img-fluid" alt={pageContent[5]?.title} />
                                </div>
                            </div>
                        </div>
                    </section>


                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[6]?.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: pageContent[6]?.details || "" }}></div>
                            </div>
                        </div>
                    </section>


                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[7]?.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: pageContent[7]?.details || "" }}></div>
                            </div>
                        </div>
                    </section>


                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[8]?.title}</h2>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{ __html: pageContent[8]?.details || "" }}
                                className="table-responsive services-table mt-4">
                            </div>
                        </div>
                    </section>


                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="main-heading main-list sub-heading">
                                <h2>{pageContent[9]?.title}</h2>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{ __html: pageContent[9]?.details || "" }}
                                className="table-responsive services-table mt-4">
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: pageContent[10]?.details || "" }} className="sub-heading">
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EthicsCommittee;
