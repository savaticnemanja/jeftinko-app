const { addProcessor } = require('@evershop/evershop/src/lib/util/registry');

module.exports = () => {
  const schemaUpdater = (schema) => {
    schema.properties.sort_order = {
      type: ['string', 'number'],
      pattern: '^\\d+$'
    };
    return schema;
  };

  addProcessor('createProductDataJsonSchema', schemaUpdater, 10);
  addProcessor('updateProductDataJsonSchema', schemaUpdater, 10);

  const parseSortOrder = (data) => {
    if (data.sort_order === '') {
      data.sort_order = null;
    }
    if (typeof data.sort_order === 'string') {
      data.sort_order = parseInt(data.sort_order, 10);
    }
    return data;
  };

  addProcessor('productDataBeforeCreate', parseSortOrder, 10);
  addProcessor('productDataBeforeUpdate', parseSortOrder, 10);

  addProcessor(
    'productCollectionSortBy',
    (map) => {
      return Object.assign(map, {
        id: (query) => query.orderBy('product.sort_order'),
        sort_order: (query) => query.orderBy('product.sort_order')
      });
    },
    5
  );
};
