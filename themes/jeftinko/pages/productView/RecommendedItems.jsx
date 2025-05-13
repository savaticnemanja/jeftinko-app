import ProductList from "@components/frontStore/catalog/product/list/List";
import { _ } from "@evershop/evershop/src/lib/locale/translate";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

export default function RecommendedItems({ collection }) {
  const [categoryIds, setCategoryIds] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const firstSegment = currentPath.split('/')[1];

      const categoryMap = {
        toys: [4, 5, 6, 7, 8, 9, 10, 36, 37, 38, 39, 40, 41, 42, 43], 
        footwear: [12, 13, 14, 15, 16, 17],
        clothing: [18, 33, 34],
        'formal-wear': [19, 20, 24, 27],
        babies: [28, 29, 30, 31],
        furniture: [32]
      };

      setCategoryIds(categoryMap[firstSegment] || []);
    }
  }, []);

  if (!collection || categoryIds.length === 0) {
    return null;
  }

  const allProducts = collection.products.items;

  const filteredProducts = allProducts.filter(
    (product) => categoryIds.includes(product.category?.categoryId)
  );

  if (filteredProducts.length === 0) return null;

  return (
    <div className="my-6 px-4 lg:px-4 py-8">
      <div className="page-width">
        <h2 className="mt-3 mb-6 tracking-widest font-semibold text-[#204780]">
          {collection.name}
        </h2>
        <ProductList products={filteredProducts} countPerRow={4} />
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
