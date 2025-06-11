const { setContextValue } = require('../../../../graphql/services/contextHelper');

module.exports = (request) => {
  setContextValue(request, 'pageInfo', {
    title: 'Product Sort Order',
    description: 'Organize product display order'
  });
};
