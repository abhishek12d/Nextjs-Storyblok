import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/shopify/shopify-client';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
    pages: {
        signIn: '/auth/login',
        signOut: '/',
        error: '/',
        verifyRequest: '/',
        newUser: '/',
    },
    callbacks: {
        async session({ session, token }) {
            session.user.customerAccessToken = token.customerAccessToken;
            return session;
        },
        async jwt({ user, token }) {
            if (user) {
                token.customerAccessToken = user.customerAccessToken;
            }

            return token;
        },
    },
    providers: [
        CredentialsProvider({
            id: 'shopify',
            name: 'Shopify',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'Email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                try {
                    const tokenResponse = await fetch(getStorefrontApiUrl(), {
                        body: JSON.stringify({
                            variables: {
                                input: {
                                    email: credentials.email,
                                    password: credentials.password,
                                },
                            },
                            query: `
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
              `,
                        }),
                        headers: getPublicTokenHeaders(),
                        method: 'POST',
                    });

                    if (!tokenResponse.ok) return null;

                    const {
                        data: { customerAccessTokenCreate },
                    } = await tokenResponse.json();
                    if (customerAccessTokenCreate.customerUserErrors.length) {
                        return null;
                    }

                    return {
                        name: '',
                        email: credentials.email,
                        customerAccessToken: customerAccessTokenCreate?.customerAccessToken?.accessToken || '',
                        image: '',
                    };
                } catch (error) {
                    console.log(error);
                    return null;
                }
            },
        }),
    ],
};
