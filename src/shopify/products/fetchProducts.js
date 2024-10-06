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
            variants(first: 100) {
                edges {
                    node {
                        id
                        title
                        quantityAvailable
                        selectedOptions{
                            name
                            value
                        }
                        price{
                            amount
                            currencyCode
                        }
                        compareAtPrice{
                            amount
                            currencyCode
                        }
                        image {
                            url
                            altText
                        }
                    }
                }
            }
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
