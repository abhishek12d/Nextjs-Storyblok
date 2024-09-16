"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { StoryBlokComponents } from "../../utils/StoryBlokComponents";

storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_SB_PREVIEW_TOKEN,
    use: [apiPlugin],
    components: StoryBlokComponents,
    apiOptions: {
        region: "us"
    }
});

export default function StoryblokProvider({ children }) {
    return children;
}
