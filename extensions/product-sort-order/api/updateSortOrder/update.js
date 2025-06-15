const {
  OK,
  INVALID_PAYLOAD,
  INTERNAL_SERVER_ERROR,
} = require("@evershop/evershop/src/lib/util/httpStatus");
const { select, update } = require("@evershop/postgres-query-builder");
const { pool } = require("@evershop/evershop/src/lib/postgres/connection");

module.exports = async (request, response) => {
  const { category_id } = request.params;
  const { order } = request.body;
  try {
    const category = await select()
      .from("category")
      .where("uuid", "=", category_id)
      .load(pool);
    if (!category) {
      response.status(INVALID_PAYLOAD);
      return response.json({ success: false, message: "Category not found" });
    }
    if (!Array.isArray(order)) {
      response.status(INVALID_PAYLOAD);
      return response.json({ success: false, message: "Invalid order" });
    }
    for (let i = 0; i < order.length; i += 1) {
      const uuid = order[i];
      await update("product")
        .given({ sort_order: i })
        .where("uuid", "=", uuid)
        .and("category_id", "=", category.category_id)
        .execute(pool);
    }
    response.status(OK);
    response.json({ success: true });
  } catch (e) {
    response.status(INTERNAL_SERVER_ERROR);
    response.json({ success: false, message: e.message });
  }
};
