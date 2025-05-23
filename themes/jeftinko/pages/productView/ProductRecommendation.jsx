import ProductList from "@components/frontStore/catalog/product/list/List";
import { _ } from "@evershop/evershop/src/lib/locale/translate";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

const URL_TO_COLLECTION_KEY = {
  toys: "footwear",
  footwear: "clothing",
  clothing: "footwear",
  'formal-wear': "footwear",
  babies: "toys",
  furniture: "toys",
};

export default function ProductRecommendation({ clothing, footwear, toys }) {
  const [firstSegment, setFirstSegment] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      setFirstSegment(currentPath.split("/")[1]);
    }
  }, []);

  const collections = { clothing, footwear, toys };
  const collectionKey = URL_TO_COLLECTION_KEY[firstSegment];
  const collection = collections[collectionKey];

  if (!collection || !collection.products?.items?.length) {
    return null;
  }

  const recommendedProducts = [...collection.products.items]
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);

  return (
    <div className="my-6 px-4 lg:px-4 py-8">
      <div className="page-width">
        <h2 className="mt-3 mb-6 tracking-widest font-semibold text-[#204780]">
          {collection.name}
        </h2>
        <ProductList products={recommendedProducts} countPerRow={4} />
      </div>
    </div>
  );
}

ProductRecommendation.propTypes = {
  clothing: PropTypes.object,
  footwear: PropTypes.object,
};

ProductRecommendation.defaultProps = {
  clothing: null,
  footwear: null,
};

export const layout = {
  areaId: "productPageBottom",
  sortOrder: 1,
};

// Merge all possible collections into one GraphQL query
export const query = `
  query {
    clothing: collection(code: "recommendeditemsclothing") {
      collectionId
      name
      products {
        items {
          productId
          variantGroupId
          name
          price {
            regular {
              value
              text
            }
            special {
              value
              text
            }
          }
          image {
            alt
            url: listing
          }
          url
          category {
            categoryId
            name
            url
          }
        }
      }
    }
    footwear: collection(code: "recommendeditemsfootwear") {
      collectionId
      name
      products {
        items {
          productId
          variantGroupId
          name
          price {
            regular {
              value
              text
            }
            special {
              value
              text
            }
          }
          image {
            alt
            url: listing
          }
          url
          category {
            categoryId
            name
            url
          }
        }
      }
    }
    toys: collection(code: "recommendeditemstoys") {
      collectionId
      name
      products {
        items {
          productId
          variantGroupId
          name
          price {
            regular {
              value
              text
            }
            special {
              value
              text
            }
          }
          image {
            alt
            url: listing
          }
          url
          category {
            categoryId
            name
            url
          }
        }
      }
    }
  }
`;
