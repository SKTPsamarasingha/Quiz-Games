import {pool} from "./DBConfig.js"

const saveUser = async (obj) => {
    const query = `
        INSERT INTO users (username, email, password,usertype,image)
        VALUES ($1, $2, $3,$4,$5) RETURNING *`;

    const values = Object.values(obj);

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error inserting user:", error);
        throw error;
    }
}

export {saveUser}