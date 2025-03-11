import pg from "pg"
import dotenv from "dotenv"

dotenv.config({path: "dotenv.env"});
const {Pool} = pg

export const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: String(process.env.PG_PASSWORD),
    port: process.env.PG_PORT
})


