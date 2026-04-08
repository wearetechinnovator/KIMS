const youtubeData = async (id) => {
    let api = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${process.env.NEXT_PUBLIC_YOUTUBE_KEY}`;

    try {
        const req = await fetch(api);
        const res = await req.json();

        return res;
    } catch (error) {
        throw new Error("Data not found");

    }
}


export default youtubeData;