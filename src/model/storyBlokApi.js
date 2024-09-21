import { getStoryblokApi } from "@storyblok/react"

const storyblokApi = async (slug) => {
    let sbParams = {
        version: "draft",
        starts_with: slug,
    };

    const storyblok = getStoryblokApi();
    try {
        const { data } = await storyblok.get(`cdn/stories`, sbParams);
        return data.stories;
    } catch (error) {
        console.error("Error fetching data from Storyblok:", error);
        throw error;
    }
};

export default storyblokApi;
