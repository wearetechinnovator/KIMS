const homeServices = {
    getAll: async ({ langLoc }) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/home-service-details?populate=*&pagination[limit]=100&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getSingleHomeService: async ({slug, langLoc}) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/home-service-details/?filters[slug][$eq]=${slug}&populate[0]=icon&populate[1]=featuredImage&populate[2]=banner&populate[3]=overviewSection&populate[4]=whyChooseUs&populate[5]=banner.bannerItem&populate[6]=banner.bannerItem.bannerImageDesktop&populate[7]=banner.bannerItem.bannerImageMobile&populate[8]=whyChooseUs.image&populate[9]=testimonialSection&populate[10]=metaSection&populate[11]=homeServiceSection&populate[12]=hospitals`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },
}

export default homeServices;
