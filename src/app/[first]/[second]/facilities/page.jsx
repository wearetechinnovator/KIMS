import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import { marked } from 'marked';
import FormInternationalFacilities from '@/components/Forms/FormInternationalFacilities';


const Facilities = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl()

    const field = "populate[0]=pageContent&populate[1]=pageContent.contentCard&populate[2]=pageContent.contentCard.image";

    const data = await getStaticPageContent("facilities", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    let staticTexts = await getStaticText();



    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="home-service-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent[0].title}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={pageContent[0].title}
                                        middleTitle={''}
                                        middleURL={''}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <div className="container">
                            <div className="row mb-lg-5">

                                <div className="col-md-12 mb-3  order-lg-2 order-1">
                                    <div className="main-heading sub-heading">
                                        <h2>{pageContent[1].title}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: marked(pageContent[1].details || "") || "" }}></div>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </section>


                    {pageContent[2]?.title && <div className="line-divider"> </div>}
                    {pageContent[2]?.title && <section className="section">
                        <div className="container">
                            <div className="row mb-lg-5">

                                <div className="col-md-12 mb-3">
                                    <div className="main-heading sub-heading">
                                        <h2>{pageContent[2].title}</h2>
                                    </div>
                                </div>

                                {
                                    pageContent[3].contentCard.map((c, i) => {
                                        return <div className="col-md-4" key={i}>
                                            <div className="speciality-masterpage-card-content d-flex align-items-center gap-3 mb-3">
                                                <span><img src={process.env.NEXT_PUBLIC_IMAGE_URL + c?.image?.url} alt={c?.title} className="img-fluid" /></span> {c.title}
                                            </div>
                                        </div>
                                    })
                                }



                            </div>



                        </div>
                    </section>}



                    {pageContent[4]?.title && <div className="line-divider"> </div>}
                    {pageContent[4]?.title && <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                                    <div className="main-heading">
                                        <h2 className="mb-lg-1">{pageContent[4]?.title}</h2>
                                        <h3 className="mb-lg-3">{pageContent[4]?.subTitle}</h3>
                                    </div>
                                    <div className='main-heading sub-heading main-list' dangerouslySetInnerHTML={{ __html: marked(pageContent[4]?.details || "") || "" }}></div>
                                </div>
                                <div className="col-md-4 sub-heading order-lg-2 order-1 mb-lg-0 mb-3">
                                    <div className="association-form-card mb-0" id="bookNowForm" >
                                        <FormInternationalFacilities title={"Enquire Now"} type={"International"} subject={"Facilities Enquiry"} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Facilities