const awardData = {
    getAll: async ({ langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/awards?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;

    },

    getFeatured: async ({ langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/awards?populate=*&filters[locations][id][$eq]=${langLoc.loc.id}&filters[manageAppearance][showInFeaturedList][$eq]=true&sort=manageAppearance.orderInFeaturedList:asc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;

    }
}


export default awardData;
