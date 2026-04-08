import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import SpecialistListing from '@/components/SpecialistListing';
import getSpecialist from '@/app/lib/getSpecialist';



const Doctor = async ({ params }) => {
    const slug = params.details;
    const getLangLoc = await getCurrentLangLoc()
    const baseURL = await getBaseUrl(true, true);
    const data = await getStaticPageContent("doctor");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();


    const specialistData = await getSpecialist.getSingleSpecialist({ slug, langLoc: getLangLoc });




    const specialistDataSet = {
        speciality: specialistData.speciality ? specialistData.speciality.id : null,
        procedure: specialistData.procedure ? specialistData.procedure.id : null,
        disease: specialistData.disease ? specialistData.disease.id : null,
        hospital: specialistData.hospital ? specialistData.hospital.id : null,
        location: specialistData.location ? specialistData.location.id : null,
    };


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="find-doctor-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{specialistData?.title}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={specialistData?.title}
                                        middleTitle={staticText['Specialist']}
                                        middleURL={baseURL + "/specialist"}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <SpecialistListing
                        specialistDataSet={specialistDataSet}
                        baseURL={baseURL}
                        langLoc={getLangLoc}
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Doctor