import Sequelize from 'sequelize';
import dotenv from "dotenv"

dotenv.config({path: "dotenv.env"});


export const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

