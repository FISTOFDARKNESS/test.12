
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: {
    edges: {
      node: {
        url: string;
        altText: string;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
}

const SHOPIFY_TOKEN = (import.meta as any).env.VITE_SHOPIFY_STOREFRONT_TOKEN;

async function shopifyFetch(query: string, variables = {}) {
  const endpoint = `https://excaliburstore-2.myshopify.com/admin/api/2026-01/graphql.json`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const json = await response.json();
  if (json.errors) {
    console.error('Shopify GraphQL Errors:', json.errors);
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

export const getProducts = async () => {
  const query = `
    query getProducts {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query);
  return data.products.edges.map((edge: any) => edge.node);
};

export const getProductByHandle = async (handle: string) => {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        images(first: 5) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  const data = await shopifyFetch(query, { handle });
  return data.product;
};
