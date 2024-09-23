const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "a-us.storyblok.com"
            },
            {
                protocol: 'https',
                hostname: "cdn.shopify.com"
            },
        ],
    },
};

export default nextConfig;
