import { getBaseUrl } from '@/app/lib/getBaseUrl';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import getHealthPackageData from '@/app/lib/getHealthPackage';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import Form1 from '@/components/Forms/Form1';
import Header from '@/components/Header';
import { marked } from 'marked';

const HealthPackageDetails = async ({ params }) => {
    const getLangLoc = await getCurrentLangLoc()
    const staticText = await getStaticText();
    const basePath = await getBaseUrl(true, true);
    const data = await getHealthPackageData.getSingleHealthPackage({slug: params.details, langLoc: getLangLoc});
    const limitedData = await getHealthPackageData.getLimited({ langLoc: getLangLoc });


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="health-pack-details-main-page">
                    <section className="section details-page-before py-0">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12">
                                                        <Breadcrumb
                                                            activeTitle={data.title}
                                                            middleTitle={'Health Packages'}
                                                            middleURL={"/health-package"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3 className="mb-2">{data.title}</h3>
                                                    <ul>

                                                        <li className="test-tube">{staticText['No. of Tests']}: {data?.noOfTest}</li>
                                                        <li className="hospital-doctor"> {staticText['No. of Consultations']}: {data.noOfConsultation} </li>
                                                        <li className="hospital-icon-custom"> {data?.hospitals[0]?.title}</li>
                                                        <li> <i className="fa-solid fa-indian-rupee-sign"></i> {staticText['INR']} {data.price}/- </li>
                                                    </ul>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={data.banner.bannerItem[0]?.bannerImageDesktop ? process.env.NEXT_PUBLIC_IMAGE_URL + data.banner.bannerItem[0]?.bannerImageDesktop.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt={data.title} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="main-heading sub-heading main-list paragraph-line">
                                        <h3 className="mb-3">{data.overviewTitle}</h3>
                                        <div dangerouslySetInnerHTML={{ __html: marked(data?.details || "") || "" }}></div>

                                        <h2>{staticText['Test Inclusions']}</h2>
                                        <div dangerouslySetInnerHTML={{ __html: marked(data?.testIncluded || "") || "" }}></div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="association-form-card mb-5" id='book-now'>
                                        <Form1 title="GET A CALLBACK FROM OUR HEALTH ADVISOR" type={"Bookhealth Checkup"} subject={data.title}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"> </div>

                    <section className="section">
                        <div className="container">
                            <div className="main-heading sub-heading main-list">
                                <h2>{staticText['Patients Preparation Notes']}</h2>
                                <div dangerouslySetInnerHTML={{ __html: marked(data?.patientsPreparationNotes || "") || "" }}></div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"></div>
                    <section className="section">
                        <div className="container">
                            <div className="row justify-content-between" data-aos="fade-up">
                                <div className="col-md-6 col-8">
                                    <div className="main-heading">
                                        <h2>{data?.healthPackage.title}</h2>
                                    </div>
                                </div>
                                <div className="col-md-2 col-4">
                                    <div className="over-all-btn text-end">
                                        <a href={basePath + "/health-package"}>{staticText['View All']} <span><img src="/img/slider-right-arrow.svg" className="img-fluid"
                                            alt="" /></span></a>
                                    </div>
                                </div>
                            </div>

                            <div className="owl-carousel owl-theme package">
                                {
                                    limitedData.map((data, index) => {
                                        return <div className="custom-hospital-top-card" key={index}>
                                            <div className="hospital-img">
                                                <a href={basePath + "/health-package/" + data.slug}><img src={data.featuredImage ? process.env.NEXT_PUBLIC_IMAGE_URL + data.featuredImage.url : "/img/no-image.jpg"} alt={data?.title}
                                                    className="img-fluid w-100" /></a>
                                            </div>
                                            <div className="hospital-content">
                                                <h3>{data?.title}</h3>
                                                <p>{data?.noOfTest} {staticText['tests included']}</p>
                                                <div className="main-list" dangerouslySetInnerHTML={{ __html: marked(data?.shortDetails || "") || "" }}>
                                                </div>
                                                <div className="d-flex align-items-center justify-content-between py-2 ">
                                                    <div className="hospital-content p-0">
                                                        <ul>
                                                            <li className="location-icon-custom">{data?.hospitals[0]?.title}</li>
                                                        </ul>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <ul>
                                                            <li>{data?.price}/-</li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="d-lg-flex d-block align-items-center justify-content-between pt-3">
                                                    <a href={basePath + "/health-package/" + data.slug} className="btn mb-lg-0 mb-2 hospital-primarybtn">{staticText['View Details']}</a>
                                                    <a href={basePath + "/health-package/" + data.slug+"#book-now"} className="btn mb-lg-0 mb-3 hospital-secondarybtn">{staticText['Book Now']}</a>
                                                </div>
                                            </div>
                                        </div>

                                    })
                                }
                            </div>

                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default HealthPackageDetails