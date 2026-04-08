const leaderData = {
    getAll: async ({type, langLoc}) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/leaderships?populate=*&filters[type][$contains]=${type}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,name:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getSingleLeader: async ({slug, langLoc}) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/leaderships/?filters[slug][$eq]=${slug}&populate[0]=manageAppearance&populate[1]=metaSection&populate[2]=image`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },
}


export default leaderData;