import { graphqlRequest } from "@/utils/shopify/shopify";

const PRODUCT_QUERY = `
    query products($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        edges {
          node {
            id
            title
            handle
            description
            featuredImage {
                url
                altText
            }
            priceRange {
                minVariantPrice {
                    amount
                    currencyCode
                }
            }
            compareAtPriceRange {
                minVariantPrice {
                    amount
                    currencyCode
                }
            }
          }
            cursor
        }
        pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
        }
      }
    }
`

export const fetchProducts = async (params) => {
    try {
        const variables = {
            first: params?.limit,
            after: params?.cursor || null,
        };
        const { data } = await graphqlRequest(PRODUCT_QUERY, variables);
        return {
            products: data?.products?.edges.map(edge => edge.node),
            pageInfo: data?.products?.pageInfo,
        };
    } catch (error) {
        return { error }
    }
};
