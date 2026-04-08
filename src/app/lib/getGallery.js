const galleryData = {

    // For Listing.....
    getAll: async ({ langLoc }) => {

        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;
        // Get total count
        const initialReq = await fetch(`${baseUrl}/galleries?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&sort=id:desc`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];

        // Actual Data
        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = await fetch(`${baseUrl}/galleries?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&sort=id:desc`);
            const json = await url.json();
            data = [...data, ...json.data];
        }

        return data;
    },


    // For Carousel......
    getGalleryImage: async ({ langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_API_URL;
        const req = await fetch(`${baseUrl}/galleries?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&sort=id:desc`);
        const res = await req.json();

        return res.data;

    }



}


export default galleryData;