import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getStaticPageContent } from '@/app/lib/getStaticPageContent';
import Breadcrumb from '@/components/Breadcrumb';
import getStaticText from '@/app/lib/getStaticTextServer';
import getCurrentLangLoc from '@/app/lib/getCurrentLangLoc';
import { marked } from 'marked';
import { getBaseUrl } from '@/app/lib/getBaseUrl'
import AcademicGalleryViewer from '@/components/AcademicGalleryViewer';
import AcademicTab from '@/components/AcademicTab';

const Academic = async () => {
    const getLangLoc = await getCurrentLangLoc()
    const field = "populate[0]=pageContent&populate[1]=pageContent.contentCard&populate[2]=pageContent.contentCard.image&populate[3]=pageContent.socomer&populate[4]=pageContent.socomer.socomerItem&populate[5]=pageContent.socomer.socomerItem.file&populate[6]=pageContent.logoSlider&populate[7]=pageContent.logoSlider.image&populate[8]=pageContent.image&populate[9]=pageContent.bannerItem&populate[10]=pageContent.bannerItem.bannerImageDesktop&populate[11]=pageContent.bannerItem.bannerImageMobile";
    const data = await getStaticPageContent("academic", field);
    const pageContent = data?.data[0]?.pageContent;
    const pageMeta = data?.data[0]?.metaSection;
    const staticText = await getStaticText();
    const baseUrl = await getBaseUrl(true, true);



    return (
        <>
            <Header />
            <div role="main" className="main">
                <div className="find-doctor-main-page academic-new-page-2026">
                    <AcademicTab
                        pageContent={pageContent}
                        baseUrl={baseUrl}
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Academic;
