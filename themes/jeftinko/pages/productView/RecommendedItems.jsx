import ProductList from "@components/frontStore/catalog/product/list/List";
import { _ } from "@evershop/evershop/src/lib/locale/translate";
import PropTypes from "prop-types";
import React from "react";

export default function RecommendedItems({ collection }) {
  if (!collection) {
    return null;
  }

  const allProducts = collection.products.items;

  return (
    <div className="my-6 px-4 lg:px-4 py-8">
      <div className="page-width">
        <h2 className="mt-3 mb-6 tracking-widest font-semibold text-[#204780]">
          {collection.name}
        </h2>
        <ProductList products={allProducts} countPerRow={4} />
      </div>
    </div>
  );
}

RecommendedItems.propTypes = {
  collection: PropTypes.shape({
    collectionId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    products: PropTypes.shape({
      items: PropTypes.arrayOf(
        PropTypes.shape({
          productId: PropTypes.number.isRequired,
          variantGroupId: PropTypes.string,
          name: PropTypes.string.isRequired,
          price: PropTypes.shape({
            regular: PropTypes.shape({
              value: PropTypes.number.isRequired,
              text: PropTypes.string.isRequired,
            }).isRequired,
            special: PropTypes.shape({
              value: PropTypes.number.isRequired,
              text: PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired,
          image: PropTypes.shape({
            alt: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
          }),
          url: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

RecommendedItems.defaultProps = {
  recommendedItems: [],
};

export const layout = {
  areaId: "productPageBottom",
  sortOrder: 1,
};

export const query = `
  query query {
    collection (code: "recommendeditems") {
      collectionId
      name
      products (filters: [{key: "limit", operation: eq, value: "5"}]) {
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
        }
      }
    }
  }
`;
