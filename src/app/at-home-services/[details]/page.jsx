import { getBaseUrl } from '@/app/lib/getBaseUrl';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import homeServices from '@/app/lib/getHomeServices';
import getStaticText from '@/app/lib/getStaticTextServer';
import testimonialData from '@/app/lib/getTestimonial';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import Form1 from '@/components/Forms/Form1';
import Header from '@/components/Header';
import TestimonialSection from '@/components/TestimonialSection';
import { marked } from 'marked';



const HomeServiceDetails = async ({ params }) => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true);
    const data = await homeServices.getSingleHomeService({slug:params.details, langLoc: getLangLoc});
    const homeServiceData = await homeServices.getAll({ langLoc: getLangLoc });
    const staticTexts = await getStaticText()



    const testimonialDataSet = {
        sectionTitle: data.testimonialSection?.title,
        buttonText: 'View All', buttonURL: `${basePath + "/testimonial"}`,
        data: await testimonialData.getFeaturedAll({ langLoc: getLangLoc }),
        baseUrl: basePath
    }

    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="home-details-main-page">
                    <section className="section details-page-before py-0 d-lg-block d-none">
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <Breadcrumb
                                                            activeTitle={data.title}
                                                            middleTitle={staticTexts['At Home Services']}
                                                            middleURL={basePath + "/at-home-services"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="details-banner">
                                                <div className="details-heading">
                                                    <h3 className="mb-2">{data.title}</h3>
                                                    <ul>
                                                        <li><a href={"tel:" + data.contactNo}><i className="fa-solid fa-phone"></i>
                                                            {data.contactNo}</a></li>
                                                        <li><a href={"mailto:" + data.contactEmail}><i
                                                            className="fa-solid fa-envelope"></i>
                                                            {data.contactEmail}</a></li>
                                                    </ul>
                                                    <a href="#bookNowForm" className="hospital-primarybtn">
                                                        {staticTexts['Book Now']}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 details-proceduce-banner-right-col">
                                        <img src={data.banner?.bannerItem[0]?.bannerImageDesktop?.url ?
                                            process.env.NEXT_PUBLIC_IMAGE_URL + data.banner?.bannerItem[0]?.bannerImageDesktop?.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt={data.title}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section details-page-before py-0 d-lg-none d-block" >
                        <div className="procedures-details-page-header inner-pages-header">
                            <div className="container-fluid px-0">
                                <div className="row">
                                    <div className="col-md-6 details-proceduce-banner-left-col">
                                        <div className="hospital-banner-container">
                                            <div className="breadcrumb-wrapper py-2 ps-2 ms-1">
                                                <div className="row">
                                                    <div className="col-12 px-0">
                                                        <Breadcrumb
                                                            activeTitle={data.title}
                                                            middleTitle={staticTexts['At Home Services']}
                                                            middleURL={basePath + "/at-home-services"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="details-proceduce-banner-right-col">
                                                <img src={data.banner?.bannerItem[0]?.bannerImageMobile?.url ?
                                                    process.env.NEXT_PUBLIC_IMAGE_URL + data.banner?.bannerItem[0]?.bannerImageMobile?.url : "/img/no-image.jpg"} className="img-fluid details-banner-image" alt={data.title} />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-md-6" >
                                        <div className="details-banner">
                                            <div className="details-heading">
                                                <h3 className="mb-2">{data.title}</h3>
                                                <ul>
                                                    <li><a href={"tel:" + data.contactNo}><i className="fa-solid fa-phone"></i>
                                                        {data.contactNo}</a></li>
                                                    <li><a href={"mailto:" + data.contactEmail}><i
                                                        className="fa-solid fa-envelope"></i>
                                                        {data.contactEmail}</a></li>
                                                </ul>
                                                <a href="#" className="hospital-primarybtn"> {staticTexts['Book Now']}</a>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="main-heading sub-heading">
                                        <h2 className="mb-1">{data.overviewSection?.title}</h2>
                                        <h3 className="mb-4">{data.overviewSection?.subTitle}</h3>
                                        <div dangerouslySetInnerHTML={{ __html: marked(data.overviewSection?.details || "") }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="association-form-card mb-0"  id="bookNowForm" >
                                        <Form1 title={"GET A CALLBACK FROM OUR HEALTH ADVISOR"} type={"Health At Home Services"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"> </div>
                    <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-5 mb-lg-0 mb-3">
                                    <div className="details-right-col text-center">
                                        <img src={
                                            data.whyChooseUs?.image.url ?
                                                process.env.NEXT_PUBLIC_IMAGE_URL + data.whyChooseUs?.image?.url : "/img/no-image.jpg"} alt={data.whyChooseUs.title} className="img-fluid w-100" />
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="main-heading sub-heading main-list">
                                        <h2 className="mb-1">{data.whyChooseUs?.title}</h2>
                                        <h3 className="mb-lg-4 mb-2">{data.whyChooseUs?.subTitle}</h3>
                                        <div dangerouslySetInnerHTML={{ __html: marked(data.whyChooseUs?.content) }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="line-divider"></div>
                    <TestimonialSection dataSet={testimonialDataSet} />


                    <div className="line-divider"></div>
                    <section className="section exellence-section" data-aos="fade-up">
                        <div className="container">
                            <div className="row justify-content-between">
                                <div className="col-md-4 col-8">
                                    <div className="main-heading">
                                        <h2>{data.homeServiceSection?.title}</h2>
                                    </div>
                                </div>
                                <div className="col-md-2 col-4">
                                    <div className="over-all-btn text-end">
                                        <a href={basePath + "/at-home-services"}>{staticTexts['View All']} <span><img src="/img/slider-right-arrow.svg" className="img-fluid"
                                            alt="" /></span></a>
                                    </div>
                                </div>
                            </div>

                            <div className="owl-carousel owl-theme exellence">
                                {
                                    homeServiceData?.map((h, index) => {
                                        return <div className="item" key={index}>
                                            <div className="card border-0">
                                                <div className="card-top">
                                                    <img src={h.featuredImage?.url ?
                                                        process.env.NEXT_PUBLIC_IMAGE_URL + h.featuredImage?.url : "/img/no-image.jpg"} className="img-fluid w-100" alt={h.title} />
                                                </div>
                                                <div className="card-content">
                                                    <h4>{h.title}</h4>
                                                    <p>{h.shortDetails}</p>
                                                    <div className="main-btn">
                                                        <a href={basePath + "/at-home-services/" + h.slug}>
                                                            {staticTexts['Read More']} <span><i className="fa-solid fa-arrow-right"></i></span>
                                                        </a>
                                                    </div>
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

export default HomeServiceDetails;
