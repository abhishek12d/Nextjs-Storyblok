import { getPublicTokenHeaders, getStorefrontApiUrl } from "../shopify-client";

export const createCustomer = async ({ email, password, firstName, lastName, phone }) => {
    let customer = null;

    try {
        const res = await fetch(getStorefrontApiUrl(), {
            headers: getPublicTokenHeaders(),
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({
                variables: {
                    input: {
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        phone: phone,
                    },
                },
                query: `
            mutation createCustomer($input) {
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
          `,
            }),
        });

        const data = await res.json();
        if (data?.errors?.length) {
            return {
                error: data.errors[0].message
            }
        }

        customer = { ...data.data.customerCreate.customer };
        return customer;
    } catch (error) {
        console.warn(error);
        return {
            error: error
        }
    }
};
