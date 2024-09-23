import { graphqlRequest } from "@/utils/shopify/shopify";

const CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const createCustomerAccessToken = async ({ email, password }) => {
    try {
        const data = await graphqlRequest(CUSTOMER_ACCESS_TOKEN_CREATE_MUTATION, {
            input: { email, password, },
        });

        const userErrors = data?.data?.customerAccessTokenCreate?.customerUserErrors;

        if (data.error) {
            return { error: data.error }
        } else if (userErrors?.length) {
            return { error: userErrors[0].message };
        } else {
            const customerAccessToken = data?.data?.customerAccessTokenCreate?.customerAccessToken;
            return {
                accessToken: customerAccessToken.accessToken,
                expiresAt: customerAccessToken.expiresAt,
            };
        }
    } catch (error) {
        return { error }
    }
};
