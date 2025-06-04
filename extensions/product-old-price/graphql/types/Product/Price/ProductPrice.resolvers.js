module.exports = {
  Product: {
    price: (product) => {
      const special = parseFloat(product.price);
      const regular = product.oldPrice ? parseFloat(product.oldPrice) : special;
      return {
        regular,
        special,
      };
    },
  },
};
