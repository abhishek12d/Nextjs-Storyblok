import { getStoryblokApi } from "@storyblok/react"

const storyblokApi = async (slug) => {
    let sbParams = {
        version: "draft",
    };

    const storyblok = getStoryblokApi();
    try {
        const { data } = await storyblok.get(`cdn/stories/${slug}`, sbParams);
        return data;
    } catch (error) {
        console.error("Error fetching data from Storyblok:", error);
        throw error;
    }
};

export default storyblokApi;
