import { graphqlRequest } from "@/utils/shopify/shopify";
import { productDetailsFragment } from "../fragments/product";

export async function fetchProduct({ handle }) {
    const query = `
      query getProductByHandle($handle: String!) {
        product(handle: $handle) {
          ...productDetails
        }
      }
  
      ${productDetailsFragment}
    `;

    const variables = { handle };

    const data = await graphqlRequest(query, variables);
    return data?.data?.product;
}
