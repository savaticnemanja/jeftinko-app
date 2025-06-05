const { addProcessor } = require("@evershop/evershop/src/lib/util/registry");

module.exports = () => {
  const schemaUpdater = (schema) => {
    // eslint-disable-next-line no-param-reassign
    schema.properties.old_price = {
      type: ["string", "number"],
      pattern: "^\\d+(\\.\\d{1,2})?$",
      errorMessage: {
        pattern: "Old price should be a number with maximum 2 decimal places",
      },
    };
    return schema;
  };

  addProcessor("createProductDataJsonSchema", schemaUpdater, 10);
  addProcessor("updateProductDataJsonSchema", schemaUpdater, 10);

  const parseOldPrice = (data) => {
    if (data.old_price === "") {
      // eslint-disable-next-line no-param-reassign
      data.old_price = null;
    }
    if (typeof data.old_price === "string") {
      // eslint-disable-next-line no-param-reassign
      data.old_price = parseFloat(data.old_price);
    }
    return data;
  };

  addProcessor("productDataBeforeCreate", parseOldPrice, 10);
  addProcessor("productDataBeforeUpdate", parseOldPrice, 10);
};
