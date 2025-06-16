const {
  buildFilterFromUrl,
} = require("@evershop/evershop/src/lib/util/buildFilterFromUrl");
const {
  setContextValue,
} = require("@evershop/evershop/src/modules/graphql/services/contextHelper");

module.exports = async (request, response, delegate, next) => {
  const filters = buildFilterFromUrl(request);
  const hasSort = filters.some((f) => f.key === "ob");
  if (!hasSort) {
    filters.push({ key: "ob", operation: "eq", value: "sort_order" });
  }
  const hasDir = filters.some((f) => f.key === "od");
  if (!hasDir) {
    filters.push({ key: "od", operation: "eq", value: "asc" });
  }
  setContextValue(request, "filtersFromUrl", filters);
  next();
};
