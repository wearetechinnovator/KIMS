import { cookies } from "next/headers"



const getCurrentLangLoc = async () => {
    const cookieStore = await cookies();
    const getLang = cookieStore.get("systemLang")?.value;
    const getLoc = cookieStore.get("systemLocation")?.value;

    return {
        lang: JSON.parse(getLang),
        loc: JSON.parse(getLoc)
    };

}

export default getCurrentLangLoc;