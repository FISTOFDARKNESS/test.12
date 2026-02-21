export interface ShopifyProduct {
  id: string
  title: string
  handle: string
  description: string
  images: {
    edges: {
      node: {
        url: string
        altText: string
      }
    }[]
  }
  variants: {
    edges: {
      node: {
        id: string
        title: string
        price: {
          amount: string
          currencyCode: string
        }
      }
    }[]
  }
}

const SHOPIFY_DOMAIN = 'excaliburstore-2.myshopify.com'
const SHOPIFY_TOKEN = (import.meta as any).env.VITE_SHOPIFY_STOREFRONT_TOKEN;

const ENDPOINT = `https://${SHOPIFY_DOMAIN}/admin/api/2024-10/graphql.json`

async function shopifyFetch(query: string, variables: Record<string, any> = {}) {
  if (!SHOPIFY_TOKEN) {
    throw new Error('Shopify Storefront Token is missing. Please set VITE_SHOPIFY_STOREFRONT_TOKEN in your environment variables.');
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN
    },
    body: JSON.stringify({ query, variables })
  })

  const json = await response.json()

  if (!response.ok || json.errors) {
    const isUnauthorized = json.errors?.some((e: any) => e.extensions?.code === 'UNAUTHORIZED');
    
    if (isUnauthorized) {
      throw new Error('Unauthorized: Your Shopify Storefront Token is invalid or does not have access to this store. Please check your credentials.');
    }

    const errorMessage = json.errors 
      ? json.errors.map((e: any) => e.message || 'Unknown GraphQL error').join(', ') 
      : `Shopify API error: ${response.statusText}`;
    
    console.error('Shopify GraphQL Errors:', json.errors);
    throw new Error(errorMessage);
  }

  return json.data
}

export const getProducts = async (): Promise<ShopifyProduct[]> => {
  const query = `
    query {
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
      }
    }
  `

  const data = await shopifyFetch(query)
  return data.products.edges.map((edge: any) => edge.node)
}

export const getProductByHandle = async (
  handle: string
): Promise<ShopifyProduct | null> => {
  const query = `
    query ($handle: String!) {
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
  `

  const data = await shopifyFetch(query, { handle })
  return data.product
}