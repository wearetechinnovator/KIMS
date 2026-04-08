"use client"
import formatDate from "@/app/lib/formatDate";
import getStaticText from "@/helper/getStaticText";
import { useEffect, useState } from "react";

const WallframeSection = ({ dataSet }) => {
   const [staticTexts, setStaticTexts] = useState({});

    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();
    }, []);


     if (!dataSet.data || dataSet.data.length < 1) {
        return;
    }
    
    return (
        <>
            <section className="section wallframe-section">
                <div className="container">
                    <div className="row justify-content-between mb-lg-5 mb-3" data-aos="fade-right">
                        <div className="col-md-3 col-8">
                            <div className="main-heading">
                                <h2>{dataSet.sectionTitle}</h2>
                            </div>
                        </div>
                        <div className="col-md-2 col-4">
                            <div className="over-all-btn text-end">
                                {/* <a href={dataSet.buttonURL}>
                                    {staticTexts[dataSet.buttonText]} <span><img src="/img/slider-right-arrow.svg" className="img-fluid"
                                        alt="Read More" /></span>
                                </a> */}
                            </div>
                        </div>
                    </div>
                    <div className="position-relative">
                        <div className="white-box"></div>
                    </div>

                    <div className="owl-carousel owl-theme wall-frame">
                        {
                            dataSet?.data?.map((a, index) => {
                                return <div className="row justify-content-between" key={index}>
                                    <div className="col-xl-4 col-lg-4 col-md-4 col-6">
                                        <div className="frame-left-col" data-aos="slide-right">

                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${a.featuredImage?.url}`}
                                            className="img-fluid w-100" alt={a.title} loading='lazy' />
                                        </div>
                                    </div>
                                    <div className="col-xl-7 col-lg-7 col-md-7 col-6 my-auto">

                                        <div className="frame-right-col" data-aos="slide-left">
                                            <h5>{staticTexts['Date']}: {formatDate(a.date)}</h5>
                                            <h2>{a.title}</h2>
                                            <p>{a.shortDetails}</p>
                                            <p className="d-lg-block d-none">{a.details?.slice(0, 120)}</p>
                                        </div>

                                    </div>
                                </div>
                            })
                        }

                    </div>

                </div>
            </section>
        </>
    )
}

export default WallframeSection