import { graphqlRequest } from "@/utils/shopify/shopify";

const CUSTOMER_CREATE_MUTATION = `
  mutation createCustomer($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        firstName
        lastName
        displayName
        email
        phone
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const createCustomer = async ({ email, password, firstName, lastName, phone }) => {
  let customer = null;

  try {
    const data = await graphqlRequest(CUSTOMER_CREATE_MUTATION, {
      input: { email, password, firstName, lastName, phone: `+91${phone}` },
    });

    const userErrors = data?.data?.customerCreate?.customerUserErrors;

    if (data.error) {
      return { error: data.error }
    } else if (userErrors?.length) {
      return { error: userErrors[0].message };
    } else {
      customer = { ...data?.data?.customerCreate.customer };
      return customer;
    }
  } catch (error) {
    return { error }
  }
};
