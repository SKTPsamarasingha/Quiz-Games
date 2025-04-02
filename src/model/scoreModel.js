import {Sequelize, DataTypes, Model} from 'sequelize';
import {sequelize} from '../config/sequelize.js';

class Score extends Model {

}

Score.init({
    scoreID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userid: {
        type: DataTypes.INTEGER,
        foreignKey: true,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'score',
    tableName: 'scores',
    timestamps: false,
})
export default Score