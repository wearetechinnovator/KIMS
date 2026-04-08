const jobData = {
    getAll: async ({ langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        const initialReq = await fetch(`${baseUrl}/jobs`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = `${baseUrl}/jobs?populate=*&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=date:desc,manageAppearance.orderInMasterList:asc,title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }


        return data;

    },

    getSingleJob: async ({slug, langLoc}) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/jobs/?filters[slug][$eq]=${slug}&populate=*`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },

}

export default jobData;