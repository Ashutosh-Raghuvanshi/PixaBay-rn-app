import axios from "axios";

export const pixaApi = async (page) => {
    const res = await axios.get(`https://pixabay.com/api/?key=42585703-9568119110add0f96ab32d42c&q=ab&image_type=photo&page=${page}`);
    return res.data;
}

export const getImages = (params) => {
    return pixaApi.get("api/", {
        params: {
            ...params,
            key: "42585703-9568119110add0f96ab32d42c",
            image_type: "photo"
        }
    }).then(res => res.data)
}