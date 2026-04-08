const getHealthPackageData = {

    // FOR LISTING PAGE;
    getAll: async ({ langLoc, URLParams }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;



        // Get total count
        const initialReq = await fetch(`${baseUrl}/health-packages?filters[locations][id][$eq]=${langLoc.loc.id}`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/health-packages/?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }


        return data;

    },

    // FOR LISTING PAGE;
    getLimited: async ({ langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;


        const url = baseUrl + `/health-packages/?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;

    },


    // FOR DETAILS PAGE;
    getSingleHealthPackage: async ({slug, langLoc}) => {

        const req = await fetch(process.env.NEXT_PUBLIC_CMS_API_URL + `/health-packages?populate[0]=banner.bannerItem.bannerImageDesktop&populate[1]=hospitals&populate[2]=healthPackage&populate[3]=banner.bannerItem.bannerImageMobile&&filters[slug][$eq]=${slug}`);
        const res = await req.json();

        return res.data[0];
    },


}

export default getHealthPackageData;
