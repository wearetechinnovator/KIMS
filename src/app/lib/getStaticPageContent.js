import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export const getStaticPageContent = async (slug = 'home', field = "", lang = true, loc = true, isMeta) => {
    const cookieStore = await cookies();

    try {
        // Get page category first;
        const getStaticPageCat = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/static-pages?filters[slug][$eq]=${slug}`);
        const staticPageRes = await getStaticPageCat.json();

        // Get page content
        let staticContentUrlPath = `static-page-contents?`;

        //Get Fields
        staticContentUrlPath += field === "" ? `populate[pageContent][populate]=*&populate[metaSection]=*` : field;

        //Data filter
        staticContentUrlPath += `&filters[pageCategory][id][$eq]=${staticPageRes?.data[0]?.id}`;

        // Language and location filter
        if (lang) {
            const getLang = cookieStore.get("systemLang")?.value;
            staticContentUrlPath += `&locale=${JSON.parse(getLang).id}`;
        }
        if (loc) {
            const getLoc = cookieStore.get("systemLocation")?.value;
            staticContentUrlPath += `&filters[locations][id][$eq]=${JSON.parse(getLoc).id}`;
        }

        const getStaticPageContent = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/${staticContentUrlPath}`);
        const staticPageContentRes = await getStaticPageContent.json();


        if (!isMeta && staticPageContentRes.data?.length < 1) {
           return notFound();
        }


        return staticPageContentRes;


    } catch (error) {
        console.log("Err:", error)
    }
}