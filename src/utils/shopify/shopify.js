import { GraphQLClient } from 'graphql-request';
import { getStorefrontApiUrl, getPublicTokenHeaders } from "@/shopify/shopify-client";

export const graphqlRequest = async (query, variables = {}) => {
    const client = new GraphQLClient(getStorefrontApiUrl(), {
        headers: getPublicTokenHeaders(),
    });

    try {
        const data = await client.request(query, variables);
        return { data };
    } catch (error) {
        return { error: error.message };
    }
};
