const courseData = {
    getAll: async ({ id = 0, langLoc }) => {
        const url = process.env.NEXT_PUBLIC_CMS_API_URL + `/courses?populate=*&filters[courseCategory][$eq]=${id}&pagination[start]=${0}&pagination[limit]=${100}&filters[locations][id][$eq]=${langLoc.loc.id}&sort=manageAppearance.orderInMasterList:asc,title:asc`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

    getSingleCourse: async ({slug, langLoc}) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/courses/?filters[slug][$eq]=${slug}&populate=*`;
        const req = await fetch(url);
        const res = await req.json();

        return res.data[0];

    },

}

export default courseData;