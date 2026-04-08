'use client'
import getCurrentLangLocClient from "@/helper/getCurrentLangLocClient";
import getStaticText from "@/helper/getStaticText";
import { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';



const GalleryCarousel = ({ dataSet, extraClass }) => {
    const [staticTexts, setStaticTexts] = useState({});


    useEffect(() => {
        const get = async () => {
            const langLoc = await getCurrentLangLocClient();
            const texts = await getStaticText();
            setStaticTexts(texts);
        };

        get();
    }, []);



    return (
        <>
            <PhotoProvider>
                <section className={`section  d-lg-block d-none pb-1  ${extraClass}`}>
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-md-3 col-8">
                                <div className="main-heading">
                                    <h2>{dataSet.sectionTitle}</h2>
                                </div>
                            </div>
                            <div className="col-md-2 col-4">
                                <div className="over-all-btn text-end">
                                    <a href={dataSet.buttonURL}>
                                        {staticTexts[dataSet.buttonText]}
                                        <span>
                                            <img src="/img/slider-right-arrow.svg" className="img-fluid" alt="Read More" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="owl-carousel owl-theme gallery-slider">
                            {
                                dataSet.data?.map((l, i) => {
                                    return <div className="card border-0" key={i}>
                                        <div className="card-top">
                                            <PhotoView src={l.featuredImage ? process.env.NEXT_PUBLIC_IMAGE_URL + l.featuredImage.url : "/img/no-image.jpg"}>
                                                <img
                                                    src={l.featuredImage ? process.env.NEXT_PUBLIC_IMAGE_URL + l.featuredImage.url : "/img/no-image.jpg"}
                                                    className="img-fluid w-100" alt={l.title}
                                                    loading='lazy'
                                                />
                                            </PhotoView>
                                        </div>
                                        <div className="card-content">
                                            <h4>{l.title}</h4>
                                            <p>{l.shortDetails}</p>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </section>
            </PhotoProvider>

            <PhotoProvider>
                <section className="section blog-section d-lg-none d-block">
                    <div className="container">
                        <div className="row justify-content-between" >
                            <div className="col-md-3 col-8">
                                <div className="main-heading">
                                    <h2>{dataSet.sectionTitle} </h2>
                                </div>
                            </div>
                            <div className="col-md-2 col-4">
                                <div className="over-all-btn text-end">
                                    <a href={dataSet.buttonURL}>
                                        {dataSet.buttonText}
                                        <span>
                                            <img src="/img/slider-right-arrow.svg" className="img-fluid" alt="Read More" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <div className="blog-card">
                                    <div className="row">
                                        {
                                            dataSet.data?.map((l, i) => {
                                                return <div className="col-6" key={"m" + i}>

                                                    <PhotoView src={l.featuredImage ? process.env.NEXT_PUBLIC_IMAGE_URL + l.featuredImage.url : "/img/no-image.jpg"}>
                                                        <img
                                                            src={l.featuredImage ? process.env.NEXT_PUBLIC_IMAGE_URL + l.featuredImage.url : "/img/no-image.jpg"}
                                                            className="img-fluid w-100" alt={l.title}
                                                            loading='lazy'
                                                        />
                                                    </PhotoView>

                                                    <div className="testi-rightbox">
                                                        <h3>{l.title}</h3>
                                                        <p>{l.shortDetails}</p>
                                                    </div>
                                                </div>
                                            })
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </PhotoProvider>
        </>
    );
};

export default GalleryCarousel;
