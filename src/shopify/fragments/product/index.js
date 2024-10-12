export const productDetailsFragment = `
  fragment productDetails on Product {
    id
    title
    seo {
      description
      title
    }
    sellingPlanGroups (first: 10) {
      edges {
        node {
          options {
            name
            values
          }
          sellingPlans (first: 10) {
            edges {
              node {
                description
                id
                name
                checkoutCharge {
                  type
                  value {
                    ... on MoneyV2 {
                      amount
                      currencyCode
                    }
                    ... on SellingPlanCheckoutChargePercentageValue {
                      percentage
                    }
                  }
                }
                priceAdjustments {
                  adjustmentValue {
                    __typename

                    ... on SellingPlanPercentagePriceAdjustment {
                      adjustmentPercentage
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    handle
    availableForSale
    vendor
    featuredImage {
      id
      altText
      height
      url
      thumbnail_url: url (transform: {
        maxWidth: 10
        maxHeight: 10
      })
      width
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    createdAt
    description
    descriptionHtml
    productType
    publishedAt
    tags
    images(first: 10) {
      edges {
        node {
          id
          altText
          height
          url
          thumbnail_url: url (transform: {
            maxWidth: 10
            maxHeight: 10
          })
          width
        }
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 100) {
      edges {
        node {
          id
          sku
          title
          price {
            amount
            currencyCode
          }
          product {
            title
          }
          image {
            id
            src
            url
          }
          compareAtPrice {
            amount
            currencyCode
          }
          description: metafield(namespace: "my_fields", key: "description") {
            value
          }
          sellingPlanAllocations (first: 10) {
            edges {
              node {
                priceAdjustments {
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  price {
                    amount
                    currencyCode
                  }
                }
                sellingPlan {
                  description
                  id
                  name
                  checkoutCharge {
                    type
                    value {
                      ... on MoneyV2 {
                        amount
                        currencyCode
                      }
                      ... on SellingPlanCheckoutChargePercentageValue {
                        percentage
                      }
                    }
                  }
                  priceAdjustments {
                    adjustmentValue {
                      ... on SellingPlanPercentagePriceAdjustment {
                        adjustmentPercentage
                      }
                    }
                  }
                }
              }
            }
          }
          requiresShipping
          availableForSale
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;
