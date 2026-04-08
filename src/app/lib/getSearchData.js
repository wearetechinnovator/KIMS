const serachData = {
    getSpeciality: async ({ langLoc, URLParams }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        const searchFilter = `&filters[speciality][title][$contains]=${URLParams.query}`;

        // Get total count
        const initialReq = await fetch(`${baseUrl}/specialty-details?filters[locations][id][$eq]=${langLoc.loc.id}${searchFilter}`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/specialty-details/?populate[0]=overviewSection&populate[1]=manageAppearance&populate[2]=speciality&${searchFilter}&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },


    allBlog: async ({langLoc, URLParams }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        const searchFilter = `&filters[title][$contains]=${URLParams.query}`;

        // Get total count
        const countURL =baseUrl + `/blog-posts?populate=*${searchFilter}&filters[locations][id][$eq]=${langLoc.loc.id}`;
        const initialReq = await fetch(countURL);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/blog-posts?populate=*${searchFilter}&filters[locations][id][$eq]=${langLoc.loc.id}&pagination[start]=${start}&pagination[limit]=${limit}&sort=date:desc,title:asc`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },

    getDoctor: async ({langLoc, URLParams }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        const searchFilter = `&filters[name][$contains]=${URLParams.query}`;

        // Get total count
        const countURL =baseUrl + `/doctor-details?populate=*${searchFilter}&filters[locations][id][$eq]=${langLoc.loc.id}`;
        const initialReq = await fetch(countURL);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/doctor-details?populate=*${searchFilter}&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}sort=manageAppearance.orderInMasterList:asc,name:asc`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },

    
    getPages: async ({langLoc, URLParams }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;

        const searchFilter = `&filters[pageCategory][title][$contains]=${URLParams.query}`;
        // Get total count
        const countURL =baseUrl + `/static-page-contents?populate=*${searchFilter}&filters[locations][id][$eq]=${langLoc.loc.id}`;
        const initialReq = await fetch(countURL);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/static-page-contents?populate=*${searchFilter}&pagination[start]=${start}&pagination[limit]=${limit}&filters[locations][id][$eq]=${langLoc.loc.id}sort=pageCategory.title:asc`;

            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];
        }

        return data;
    },
}


export default serachData;
