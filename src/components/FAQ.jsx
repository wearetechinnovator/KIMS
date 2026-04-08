"use client"
import formatDate from "@/app/lib/formatDate";
import getStaticText from "@/helper/getStaticText";
import { marked } from "marked";
import { useEffect, useState } from "react";



const FAQ = ({ dataSet }) => {
    const [staticTexts, setStaticTexts] = useState({});

    useEffect(() => {
        const fetchTexts = async () => {
            setStaticTexts({ ...await getStaticText() })
        };

        fetchTexts();

    }, []);

    if (!dataSet.data || dataSet.data.length < 1 || dataSet.sectionTitle == null) {
        return;
    }


    return (
        <>
            <div className="line-divider"></div>
            <section className="section">
                <div className="container">
                    <div className="main-heading main-list sub-heading">
                        <h2>{dataSet.sectionTitle}</h2>
                    </div>

                    <div className="faq-card p-4">
                        <div className="accordion" id="accordionExample">
                            {
                                dataSet?.data?.map((data, index) => {
                                    return <div className="accordion-item" key={index}>
                                        <h2 className="accordion-header">
                                            <button className={`accordion-button ${index === 0 ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}
                                                aria-expanded={`${index === 0 ? "true" : "false"}`} aria-controls={`collapse${index}`}>
                                                <span>{data.question}</span>
                                            </button>
                                        </h2>
                                        <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`} data-bs-parent="#accordionExample">
                                            <div className="accordion-body main-list" dangerouslySetInnerHTML={{ __html: marked(data.answer || "") || "" }}>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </section>

        </>
    )

}

export default FAQ;
