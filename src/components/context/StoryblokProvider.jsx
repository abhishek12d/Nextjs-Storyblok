"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_SB_PREVIEW_TOKEN,
    use: [apiPlugin],
    apiOptions: {
        region: "us"
    }
});

export default function StoryblokProvider({ children }) {
    return children;
}
