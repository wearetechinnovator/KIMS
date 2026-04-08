import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import getStaticText from '@/app/lib/getStaticTextServer'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'
import hospitalData from '@/app/lib/getHospital'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent'
import ContactUsForm from '@/components/Forms/ContactUsForm'



const ContactUs = async () => {
    const data = await getStaticPageContent("contact-us");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const getLangLoc = await getCurrentLangLoc()
    const staticText = await getStaticText();
    const hospitals = await hospitalData.getAllByType({ type: "Hospital", langLoc: getLangLoc });
    const medicalCenter = await hospitalData.getAllByType({ type: "Medical Center", langLoc: getLangLoc })
    const allHospital = [...hospitals, ...medicalCenter];


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="Contact-us-main-page">
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

                    <section className="section doctor-line-divider">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 ps-lg-0  order-lg-1 order-2">
                                    {
                                        allHospital.map((h, i) => {
                                            return <div key={i}>
                                                {i > 0 && <div className="line-divider"></div>}
                                                <section className="section">
                                                    <div className="container">
                                                        <div className="main-heading sub-heading">
                                                            <h2>{h.title}</h2>
                                                        </div>
                                                        <div className="contact-details">
                                                            <div className="contact-icon location-icon"><i className="fa-solid fa-location-dot"></i>
                                                            </div>
                                                            <div className="contact-content">
                                                                <h3>{staticText['Location']}</h3>
                                                                <p>{h.address}</p>
                                                            </div>
                                                        </div>


                                                        <div className="contact-details">
                                                            <div className="contact-icon"><i className="fa-solid fa-envelope-open"></i></div>
                                                            <div className="contact-content">
                                                                <h3>{staticText['Email']}:</h3>
                                                                <p><strong>{h.email}</strong></p>
                                                            </div>
                                                        </div>


                                                        <div className="contact-details">
                                                            <div className="contact-icon"><i className="fa-solid fa-phone"></i></div>
                                                            <div className="contact-content">
                                                                <h3>{staticText['Phone']}:</h3>
                                                                <p><strong>{h.contactNo}</strong></p>
                                                            </div>
                                                        </div>
                                                        <a href={h.mapURL} target='_blank' className="btn-tab treat-tab form-btn w-auto  mt-2 d-inline-block"><i className="fa-solid fa-diamond-turn-right"></i>
                                                        {staticText['Get Direction']}
                                                        </a>
                                                    </div>
                                                </section>
                                            </div>
                                        })
                                    }
                                </div>


                                {/* :::::::::::::: Contact FORM:::::::::::: */}
                               <ContactUsForm/>
                            </div>
                        </div>
                    </section>



                    <section className="section pt-0">
                        <div className="container-fluid px-0">
                            <div className="contact-us-map" dangerouslySetInnerHTML={{__html: pageContent[1]?.content}}>
                                {/* <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.852365339009!2d76.90677017505996!3d8.51371179152848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bc0578a58de1%3A0x1171d7b1d8b4145a!2sKIMSHEALTH%20Hospital%20Trivandrum!5e0!3m2!1sen!2sin!4v1750846766725!5m2!1sen!2sin"
                                    width="100%" height="450" style={{ "border": 0 }} allowFullScreen="" loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"></iframe> */}

                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ContactUs