const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
}


// 1)title, 
// 2)contents, 
// 3)post creator’s username, and 
// 4)date created for that post and 
// 5)have the option to leave a comment
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
                len: [100],
            },
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        creator: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        comments: {
            type: DataTypes.INTEGER,
        }
        
        
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
    }
);

module.exports = User;
