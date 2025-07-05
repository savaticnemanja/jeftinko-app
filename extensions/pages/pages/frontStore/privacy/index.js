const {
  translate,
} = require("@evershop/evershop/src/lib/locale/translate/translate");
const { get } = require("@evershop/evershop/src/lib/util/get");
const {
  setContextValue,
} = require("@evershop/evershop/src/modules/graphql/services/contextHelper");

module.exports = (request, response, delegate, next) => {
  setContextValue(request, "pageInfo", {
    title: translate("Privacy Policy"),
    description: translate("Privacy Policy"),
    url: request.url,
  });
  next();
};
