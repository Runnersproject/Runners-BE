const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_variants', {
    product_variant_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    product_color_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'product_colors',
        key: 'product_color_id'
      }
    },
    size: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product_variants',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_variant_id" },
        ]
      },
      {
        name: "product_color_id",
        using: "BTREE",
        fields: [
          { name: "product_color_id" },
        ]
      },
    ]
  });
};
