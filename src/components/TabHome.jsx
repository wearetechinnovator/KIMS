'use client';
import React, { useEffect, useState } from 'react';
import BlogCarousel from './BlogCarousel';
import GalleryCarousel from './GalleryCarousel';
import MediaCoverageCarousel from './MediaCoverageCarousel';
import MediaEventCarousel from './MediaEventCarousel';
import getStaticText from '@/helper/getStaticText';


const TabHome = ({ blogDataSet, galleryDataSet, mediaEventDataSet, mediaCoverageDataSet }) => {
    const [staticTexts, setStaticTexts] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();
    }, []);

    return (
        <section className="section blog-section pb-1">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="mb-5 sticky-from custom-tab-button-wrapper">
                            <div className="tab-group text-start mb-3">
                                <button type="button" className="btn-tab treat-tab form-btn w-auto w-sm-50 mb-lg-auto mb-1 active mx-2 omega d-inline-block"
                                    onClick={() => showBox('omega')}>
                                    {staticTexts['Blogs']}
                                </button>

                                <button type="button" className="btn-tab form-btn w-auto w-sm-50 treat-tab mx-2 omega1" onClick={() => showBox('omega1')}>
                                    {staticTexts['News']}
                                </button>

                                <button type="button" className="btn-tab form-btn w-auto w-sm-50 treat-tab mx-2 omega2" onClick={() => showBox('omega2')}>
                                    {staticTexts['Media & Events']}
                                </button>

                                <button type="button" className="btn-tab form-btn w-auto w-sm-50 treat-tab mx-2 omega3" onClick={() => showBox('omega3')}>
                                    {staticTexts['Gallery']}
                                </button>
                            </div>
                            <div className="treat-box" id="omega" style={{ 'display': 'block' }}>
                                <BlogCarousel dataSet={blogDataSet} tab={true} extraClass={"pt-1"} />
                            </div>

                            <div className="treat-box" id="omega1" style={{ display: 'none' }}>
                                <MediaCoverageCarousel dataSet={mediaCoverageDataSet} tab={true} extraClass={"pt-1"}/>
                            </div>

                            <div className="treat-box" id="omega2" style={{ display: 'none' }}>
                                <MediaEventCarousel dataSet={mediaEventDataSet} tab={true} extraClass={"pt-1"}/>
                            </div>

                            <div className="treat-box" id="omega3" style={{ display: 'none' }}>
                                <GalleryCarousel dataSet={galleryDataSet} tab={true} extraClass={"pt-1"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TabHome;



