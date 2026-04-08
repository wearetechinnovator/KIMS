'use client'
import Cookies from "js-cookie";


const getCurrentLangLocClient = async () => {
    const getLang = Cookies.get("systemLang");
    const getLoc = Cookies.get("systemLocation");

    return {
        lang: JSON.parse(getLang),
        loc: JSON.parse(getLoc)
    };

}

export default getCurrentLangLocClient;