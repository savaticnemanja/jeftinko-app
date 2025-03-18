import ProductList from "@components/frontStore/catalog/product/list/List";
import { _ } from "@evershop/evershop/src/lib/locale/translate";
import PropTypes from "prop-types";
import React from "react";

export default function NewCollection({ collection }) {
    if (!collection) {
        return null;
    }
    return (
        <div className="py-24">
            <div className="page-width">
                <h2 className="mt-3 mb-3 tracking-widest font-semibold text-[#204780]">
                    {collection.name}
                </h2>
                <ProductList products={collection.products.items} countPerRow={4} />
            </div>
        </div>
    );
}

NewCollection.propTypes = {
    collection: PropTypes.shape({
        collectionId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        products: PropTypes.shape({
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    productId: PropTypes.number.isRequired,
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
                    }).isRequired,
                    url: PropTypes.string.isRequired,
                })
            ).isRequired,
        }).isRequired,
    }).isRequired,
};

NewCollection.defaultProps = {
    collection: null,
};

export const layout = {
    areaId: "content",
    sortOrder: 14,
};

export const query = `
    query query {
        collection (code: "newcollection") {
            collectionId
            name
            products (filters: [{key: "limit", operation: eq, value: "6"}]) {
                items {
                    productId
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