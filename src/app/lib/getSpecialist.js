import { notFound } from "next/navigation";

const getSpecialist = {

    // FOR LISTING PAGE Only Parent;
    getAllSpecialist: async ({ langLoc }) => {
        const baseUrl = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;


        const locationFilter = `?filters[locations][id][$eq]=${langLoc.loc.id}`;

        // Get total count
        const initialReq = await fetch(`${baseUrl}/specialists`);
        const initialRes = await initialReq.json();
        const totalCount = initialRes.meta.pagination.total;

        console.log(`${baseUrl}/specialists`)

        const limit = 100;
        const pages = Math.ceil(totalCount / limit);
        let data = [];


        for (let i = 0; i < pages; i++) {
            const start = i * limit;
            const url = baseUrl + `/specialists/?populate[0]=speciality&populate[1]=speciality.iconImage&pagination[start]=${start}&pagination[limit]=${limit}&sort=title:asc`;
            const res = await fetch(url);
            const json = await res.json();
            data = [...data, ...json.data];

        }


        return data;

    },


    getSingleSpecialist: async ({ slug, langLoc, isMeta }) => {
        let url = process.env.NEXT_PUBLIC_CMS_API_URL + `/specialists/?filters[slug][$eq]=${slug}&populate=*`;


        const req = await fetch(url);
        const res = await req.json();
        
        // if slug not exists
        if (isMeta && res.data.length === 0) {
            return null;
        }
        else if (!isMeta && res.data.length === 0 ) {
            return notFound();
        }
        
        return res.data[0];

    },


    
    getDoctorAll: async (start = 0, limit = 12, langLoc, specialistDataSet) => {
        const base = process.env.NEXT_PUBLIC_CMS_CLIENT_API_URL;

        // Determine the correct filter
        const hospitalFilter = specialistDataSet?.hospital
            ? `&filters[hospitals][id][$eq]=${specialistDataSet.hospital}`
            : ``;

        let locationFilter = specialistDataSet?.location
            ? `&filters[locations][id][$eq]=${specialistDataSet.location}`
            : ``;


        const specialityFilter = specialistDataSet?.speciality
            ? `&filters[specialities][id][$eq]=${specialistDataSet.speciality}`
            : ``;


        const procedureFilter = specialistDataSet?.procedure
            ? `&filters[procedures][id][$eq]=${specialistDataSet.procedure}`
            : ``;

        const diseaseFilter = specialistDataSet?.disease
            ? `&filters[diseases][id][$eq]=${specialistDataSet.disease}`
            : ``;

        const url = `${base}/doctor-details?populate=*${locationFilter}${specialityFilter}${hospitalFilter}${procedureFilter}${diseaseFilter}&pagination[start]=${start}&pagination[limit]=${limit}&sort=name:asc,manageAppearance.orderInMasterList:asc`;


        const req = await fetch(url);
        const res = await req.json();

        return res.data;
    },

}

export default getSpecialist;
