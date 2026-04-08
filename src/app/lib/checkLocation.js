const checkLocation = async(loc) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_API_URL}/locations?filters[slug][$eq]=${loc}`);
        const data = await res.json();
        return data.data.length ? true : false;
    } catch {
        return false;
    }
}


export default checkLocation;