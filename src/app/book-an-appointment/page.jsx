import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import Breadcrumb from '@/components/Breadcrumb';
import getStaticText from '@/app/lib/getStaticTextServer';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import BookAnAppoinmentForm from '@/components/Forms/BookAnAppoinmentForm';
import { ToastContainer } from 'react-toastify';

const BookAnAppoinment = async ({ searchParams }) => {
    const URLParams = await searchParams;
    const getLangLoc = await getCurrentLangLoc()
    const data = await getStaticPageContent("book-an-appointment");
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();


    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="book-appointment-main-page">
                    <div className="page-header">
                        <div className="container">
                            <h2>{pageContent[0]?.title}</h2>
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

                    <BookAnAppoinmentForm pageContent={pageContent} URLParams={URLParams} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BookAnAppoinment;
