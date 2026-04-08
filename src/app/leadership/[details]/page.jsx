import { getBaseUrl } from '@/app/lib/getBaseUrl';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import leaderData from '@/app/lib/getLeader';
import getStaticText from '@/app/lib/getStaticTextServer';
import Breadcrumb from '@/components/Breadcrumb';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { marked } from 'marked';



const DoctorDetails = async ({ params }) => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true, true)
    const imgUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
    const data = await leaderData.getSingleLeader({ slug: params.details, langLoc: getLangLoc });
    const staticText = await getStaticText();


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="doctor-details-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{data.name}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={data.name}
                                        middleTitle={staticText['Leadership']}
                                        middleURL={basePath + "/leadership"}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3 mb-4">
                                    <div className="left-col-img">
                                        <img src={imgUrl + data?.image?.url} alt={data.name} className="img-fluid" />
                                        <div className="main-heading sub-heading mt-3">
                                            <h3>{data.name}</h3>
                                        </div>
                                        <div className="left-details-list mt-3">
                                            <ul>
                                                <li className="details-doc-ic">{data.designation}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-9">
                                    <div className="right-col-details">
                                        <div className="main-heading main-list" dangerouslySetInnerHTML={{ __html: marked(data.details || "") || "" }}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DoctorDetails;
