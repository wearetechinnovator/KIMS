import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';


const BmwReport = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const field = "populate[0]=pageContent&populate[1]=pageContent.bmwItem&populate[2]=pageContent.bmwItem.file&populate[3]=pageContent.bmwItem.file.file";
    const data = await getStaticPageContent("bmw-report", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();

    console.log(pageContent)

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
                                        middleTitle={''}
                                        middleURL={''}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>




                    {pageContent[1].title && <>
                        <section className="section">
                            <div className="container">
                                <div className="main-heading main-list sub-heading">
                                    <h2>{pageContent[1]?.title}</h2>
                                </div>

                                <div className="faq-card p-4">
                                    <div className="accordion" id="accordionExampler">
                                        {
                                            pageContent[1]?.bmwItem?.map((data, index) => {
                                                return <div className="accordion-item" key={index}>
                                                    <h2 className="accordion-header">
                                                        <button className={`accordion-button ${index === 0 ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapser${index}`}
                                                            aria-expanded={`${index === 0 ? "true" : "false"}`} aria-controls={`collapse${index}`}>
                                                            <span><strong>{data.title}</strong></span>
                                                        </button>
                                                    </h2>
                                                    <div id={`collapser${index}`} className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`} data-bs-parent="#accordionExampler">
                                                        <div className="accordion-body main-list">
                                                            <div class="d-flex justify-content-end">
                                                                {data.file?.map((files, index2) => {
                                                                    const href = files.link
                                                                        ? files.link
                                                                        : `${process.env.NEXT_PUBLIC_IMAGE_URL}${files?.file?.url}`;
                                                                    return <a href={href} target='_blank' class="form-btn w-auto px-5 me-3 reverse-btn" key={index2}>
                                                                        {files.title}
                                                                    </a>
                                                                })}
                                                            </div>
                                                            <div
                                                                className="table-responsive services-table mt-4" dangerouslySetInnerHTML={{ __html: data.content || "" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="line-divider"></div>
                    </>}




                    {pageContent[2].title && <>
                        <section className="section">
                            <div className="container">
                                <div className="main-heading main-list sub-heading">
                                    <h2>{pageContent[2]?.title}</h2>
                                </div>

                                <div className="faq-card p-4">
                                    <div className="accordion" id="accordionExampler">
                                        {
                                            pageContent[2]?.bmwItem?.map((data, index) => {
                                                return <div className="accordion-item" key={index}>
                                                    <h2 className="accordion-header">
                                                        <button className={`accordion-button ${index === 0 ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapser${index}`}
                                                            aria-expanded={`${index === 0 ? "true" : "false"}`} aria-controls={`collapse${index}`}>
                                                            <span><strong>{data.title}</strong></span>
                                                        </button>
                                                    </h2>
                                                    <div id={`collapser${index}`} className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`} data-bs-parent="#accordionExampler">
                                                        <div className="accordion-body main-list">
                                                            <div class="d-flex justify-content-end">
                                                                {data.file?.map((files, index2) => {
                                                                    const href = files.link
                                                                        ? files.link
                                                                        : `${process.env.NEXT_PUBLIC_IMAGE_URL}${files?.file?.url}`;
                                                                    return <a href={href} target='_blank' class="form-btn w-auto px-5 me-3 reverse-btn" key={index2}>
                                                                        {files.title}
                                                                    </a>
                                                                })}
                                                            </div>
                                                            <div
                                                                className="table-responsive services-table mt-4" dangerouslySetInnerHTML={{ __html: data.content || "" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="line-divider"></div>
                    </>}

                </div>
            </div>
            <Footer />
        </>
    )
}

export default BmwReport