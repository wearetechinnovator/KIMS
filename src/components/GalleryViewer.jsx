"use client"
import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';



const GalleryViewer = ({ allGallery, pageContent }) => {

    return (
        <PhotoProvider>
            <section className="section expert-section">
                <div className="container">
                    <div className="main-heading">
                        <h2>{pageContent[0].title}</h2>
                    </div>
                    <div className="row">
                        {
                            allGallery.map((l, i) => {
                                return <div className="col-md-3 col-6 mb-4" key={i}>
                                    <div className="expert-card" >
                                        <div className="card border-0 p-lg-4 p-0">
                                            <div className="card-top">
                                                <PhotoView src={l.featuredImage ? process.env.NEXT_PUBLIC_IMAGE_URL + l.featuredImage.url : "/img/no-image.jpg"}>
                                                    <img
                                                        src={l.featuredImage ? process.env.NEXT_PUBLIC_IMAGE_URL + l.featuredImage.url : "/img/no-image.jpg"}
                                                        className="img-fluid w-100" alt={l.title}
                                                    />
                                                </PhotoView>
                                            </div>
                                            <div className="card-content">
                                                <h4>{l.title}</h4>
                                                <p>{l.shortDetails}</p>
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

export default GalleryViewer