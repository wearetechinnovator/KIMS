"use client";
import getStaticText from '@/helper/getStaticText';
import React, { useEffect, useState, useRef } from 'react';
import getSpecialist from '@/app/lib/getSpecialist';



const SpecialistListing = ({ baseURL,langLoc, specialistDataSet }) => {
    const [docData, setDocData] = useState([]);
    const [count, setCount] = useState(0);
    const [staticText, setStaticTexts] = useState({});
    const observerRef = useRef(null);
    const loadingRef = useRef(false); // throttle loading
    const [loading, setLoading] = useState(false);
    const [endData, setEndData] = useState(false);
    const limit = 12;




    useEffect(() => {
        const fetchTexts = async () => {
            const texts = await getStaticText();
            setStaticTexts(texts);
        };



        // getFstLoad();
        fetchTexts();
    }, []);


    const loadDoctor = async () => {
        if (loading) return; // prevent multiple triggers
        setLoading(true);

        const data = await getSpecialist.getDoctorAll(count, limit, langLoc, specialistDataSet);

        if (data.length < 1) {
            setEndData(true)
        }
        setDocData(prev => [...prev, ...data]);
        setCount(prev => prev + limit);

        setLoading(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !endData) {
                    loadDoctor();
                }
            },
            { threshold: 1 }
        );

        const currentRef = observerRef.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, [count, loading, endData]);



    return (
        <section className="section">
            <div className="container">
                <div className="row">

                    {/* Doctor Cards */}
                    <div className="col-md-12 expert-section">
                        <div className="row expert-doc-listing-box ">
                            {docData?.map((d, index) => (
                                <div className="col-md-3 col-6 mb-3" key={d.slug + index}>
                                    <div className="expert-card">
                                        <div className="card border-0 p-lg-4 p-0">
                                            <div className="card-top video-iconfor-doc">
                                                <a href={baseURL + "/doctor/" + d.slug}>
                                                    <img
                                                        src={d.doctorImage?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${d.doctorImage?.url}` : "/img/no-image.jpg"}
                                                        className="img-fluid w-100"
                                                        alt={`${d.salutation ? d.salutation + " " : ""}${d.name}`}
                                                    />

                                                </a>
                                                {d.teleConsultationAvailable && <a href='https://consult.bestdocapp.com/home/KIMSTVM?version=new' target='_blank'>
                                                    <span className="video-iconfor-listing"><i className="fa-solid fa-video"></i></span>
                                                </a>}
                                            </div>
                                            <div className="card-content px-0">
                                                <h4>{`${d.salutation ? d.salutation + " " : ""}${d.name}`}</h4>
                                                <p>{d.doctorDesignation}</p>
                                                <h5>{d.specialities[0]?.title}</h5>
                                                {/* <div className="from-btn">
                                                    <a href={`${baseURL}/book-an-appointment/?doctor=${d.name}`} className="btn">{staticText['Appointment']}</a>
                                                </div> */}
                                                <div className="from-btn">


                                                    {d.appointmentAvailable && (
                                                        <a
                                                            href={`${baseURL}/book-an-appointment/?doctor-slug=${d?.slug}&location=${d?.locations?.[0]?.slug === "generic"
                                                                    ? d?.locations?.[1]?.slug
                                                                    : d?.locations?.[0]?.slug
                                                                }&hospital=${d?.hospitals?.[0]?.slug}&speciality=${d?.specialities?.[0]?.slug}`}
                                                            className="btn"
                                                        >
                                                            {staticText["Appointment"]}
                                                        </a>
                                                    )}




                                                    <a href={baseURL + "/doctor/" + d.slug} className="btn vice-btn">{staticText['View Profile']}</a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="main-btn text-lg-center text-start ms-lg-0 ms-2 mt-2">
                                                <a href={`${baseURL}/doctor/${d.slug}`}>{staticText['View Profile']}</a>
                                            </div> */}

                                    </div>
                                </div>
                            ))}
                        </div>
                        {loading && <p className="text-center p-3">Loading...</p>}
                        <div ref={observerRef} style={{ height: "1px" }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialistListing;
