"use client"
import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';



const AcademicGalleryViewer = ({ pageContent }) => {
    return (
        <PhotoProvider>
            <section className="section pt-0">
                <div className="container">
                    <div className="row">
                        {
                            pageContent[11]?.logoSlider?.map((img, index) => {
                                return <div className="col-md-4 col-6 mb-4" key={index}>
                                    <div className="expert-card" >
                                        <div className="card border-0 p-lg-4 p-0">
                                            <div className="card-top">
                                                <PhotoView
                                                    src={img.image?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${img.image.url}` : '/img/no-image.jpg'}>

                                                    <img src={img.image?.url ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${img.image.url}` : '/img/no-image.jpg'}
                                                        alt={img.title} className="img-fluid w-100" />
                                                </PhotoView>
                                            </div>
                                            <div className="card-content px-0">
                                                <span style={{fontSize:"14px"}}>{img.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </section>
        </PhotoProvider>
    )
}

export default AcademicGalleryViewer;