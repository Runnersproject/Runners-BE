var DataTypes = require("sequelize").DataTypes;
var _genders = require("./genders");
var _order_details = require("./order_details");
var _orders = require("./orders");
var _product_categories = require("./product_categories");
var _product_colors = require("./product_colors");
var _product_variants = require("./product_variants");
var _products = require("./products");
var _sellers = require("./sellers");
var _users = require("./users");

function initModels(sequelize) {
  var genders = _genders(sequelize, DataTypes);
  var order_details = _order_details(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var product_categories = _product_categories(sequelize, DataTypes);
  var product_colors = _product_colors(sequelize, DataTypes);
  var product_variants = _product_variants(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var sellers = _sellers(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  products.belongsTo(genders, { as: "gender", foreignKey: "gender_id"});
  genders.hasMany(products, { as: "products", foreignKey: "gender_id"});
  order_details.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_details, { as: "order_details", foreignKey: "order_id"});
  products.belongsTo(product_categories, { as: "category", foreignKey: "category_id"});
  product_categories.hasMany(products, { as: "products", foreignKey: "category_id"});
  product_variants.belongsTo(product_colors, { as: "product_color", foreignKey: "product_color_id"});
  product_colors.hasMany(product_variants, { as: "product_variants", foreignKey: "product_color_id"});
  order_details.belongsTo(product_variants, { as: "product_variant", foreignKey: "product_variant_id"});
  product_variants.hasMany(order_details, { as: "order_details", foreignKey: "product_variant_id"});
  product_colors.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_colors, { as: "product_colors", foreignKey: "product_id"});
  products.belongsTo(sellers, { as: "seller", foreignKey: "seller_id"});
  sellers.hasMany(products, { as: "products", foreignKey: "seller_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});

  return {
    genders,
    order_details,
    orders,
    product_categories,
    product_colors,
    product_variants,
    products,
    sellers,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
