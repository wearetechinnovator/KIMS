import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getBaseUrl } from '@/app/lib/getBaseUrl';
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import blogData from '@/app/lib/getBlog';
import getSpecialityData from '@/app/lib/getSpeciality';
import getStaticText from '@/app/lib/getStaticTextServer';
import BlogListing from '@/components/BlogListing';
import Breadcrumb from '@/components/Breadcrumb';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';


const Blog = async ({ searchParams }) => {
    const getLangLoc = await getCurrentLangLoc()
    const basePath = await getBaseUrl(true,true)
    const data = await getStaticPageContent("blog");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();


    const URLParams = await searchParams;
    const speciality = await searchParams.spciality


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="blog-master-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent[0].title}</h2>
                        </div>
                    </div>
                    <section className="breadcrumb-wrapper py-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <Breadcrumb
                                        activeTitle={pageContent[0]?.title}
                                        middleTitle={''}
                                        middleURL={''}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <BlogListing
                        basePath={basePath} 
                        speciality={speciality}
                        langLoc={getLangLoc}
                        URLParams={URLParams}
                    />

                </div>
            </div>
            <Footer />
        </>
    )
}

export default Blog;
