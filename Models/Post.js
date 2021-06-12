const { Model, DataTypes } = require("sequelize");
const sequelize = require("../Config/connection");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'user',
      //   key: 'id',
      // }
    },
    createdDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // commentedOn: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'post',
    //     key: 'id',
    //   }
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
