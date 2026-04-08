import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React from 'react'
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent'
import getStaticText from '@/app/lib/getStaticTextServer'
import Breadcrumb from '@/components/Breadcrumb'

const MileStone = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const field = "populate[0]=pageContent.item.events"
    const data = await getStaticPageContent("milestone", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();



    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="milestone-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent[0]?.title}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb activeTitle={pageContent[0]?.title} middleTitle={""} middleURL={""} />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <div className="container">
                            <div className="inner-container">
                                <ul className="timeline">
                                    {
                                        pageContent[1]?.item?.map((item, index) => {
                                            return <li className={`timeline-item ${index % 2 === 0 ? 'active' : ''}`} data-date={item.title} key={index}>
                                                <div className="main-list-black">
                                                    <ul>
                                                        {
                                                            item.events.map((e, j)=>{
                                                                return <li key={j}>{e.title}</li>
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

            </div>

            <Footer />
        </>
    )
}

export default MileStone