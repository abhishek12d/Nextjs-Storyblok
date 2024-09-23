import { createStorefrontClient } from "@shopify/hydrogen-react";

const client = createStorefrontClient({
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    storefrontApiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION,
    publicStorefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    i18n: {
        language: 'EN',
    },
});

export const getStorefrontApiUrl = function () {
    return client.getStorefrontApiUrl();
};
export const getPublicTokenHeaders = client.getPublicTokenHeaders;
export const getShopifyDomain = client.getShopifyDomain;
