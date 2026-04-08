"use client"

const JournalCarousel = (data) => {
    return (
        <section className="section journal-section">
            <div className="container">
                <div className="main-heading">
                    <h2></h2>
                </div>
                <div className="owl-carousel owl-theme journal-slider">
                    <div className="expert-card" data-aos="fade-right">
                        <a href="#">
                            <div className="card border-0">
                                <div className="card-top">
                                    <img src={"/img/no-image.jpg"} className="img-fluid w-100" alt="" />
                                </div>
                                <div className="card-content">
                                    <h5>KIMSHEALTH Expressions - Issue 31</h5>
                                </div>
                            </div>
                        </a>

                    </div>
                    <div className="expert-card" data-aos="fade-right">
                        <a href="#">
                            <div className="card border-0">
                                <div className="card-top">
                                    <img src={"/img/no-image.jpg"} className="img-fluid w-100" alt="" />
                                </div>
                                <div className="card-content">
                                    <h5>KIMSHEALTH Expressions - Issue 31</h5>
                                </div>
                            </div>
                        </a>

                    </div>
                    <div className="expert-card" data-aos="fade-right">
                        <a href="#">
                            <div className="card border-0">
                                <div className="card-top">
                                    <img src={"/img/no-image.jpg"} className="img-fluid w-100" alt="" />
                                </div>
                                <div className="card-content">
                                    <h5>KIMSHEALTH Expressions - Issue 31</h5>
                                </div>
                            </div>
                        </a>

                    </div>
                    <div className="expert-card" data-aos="fade-right">
                        <a href="#">
                            <div className="card border-0">
                                <div className="card-top">
                                    <img src={"/img/no-image.jpg"} className="img-fluid w-100" alt="" />
                                </div>
                                <div className="card-content">
                                    <h5>KIMSHEALTH Expressions - Issue 31</h5>
                                </div>
                            </div>
                        </a>

                    </div>
                    <div className="expert-card" data-aos="fade-right">
                        <a href="#">
                            <div className="card border-0">
                                <div className="card-top">
                                    <img src={"/img/no-image.jpg"} className="img-fluid w-100" alt="" />
                                </div>
                                <div className="card-content">
                                    <h5>KIMSHEALTH Expressions - Issue 31</h5>
                                </div>
                            </div>
                        </a>

                    </div>

                    {/* {
                        data.map((d, index) => {
                            return <div className="expert-card" data-aos="fade-right" key={index}>
                                <a href="#">
                                    <div className="card border-0">
                                        <div className="card-top">
                                            <img src={d.img} className="img-fluid w-100" alt="" />
                                        </div>
                                        <div className="card-content">
                                            <h5>{d.title}</h5>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        })
                    } */}

                </div>
            </div>
        </section>
    )
}

export default JournalCarousel