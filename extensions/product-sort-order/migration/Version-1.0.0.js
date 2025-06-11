const { execute } = require('@evershop/postgres-query-builder');

module.exports = async (connection) => {
  await execute(
    connection,
    'ALTER TABLE "product" ADD COLUMN IF NOT EXISTS sort_order integer DEFAULT 0'
  );
};
