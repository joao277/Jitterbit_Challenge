const connection = require('./connection');

async function testConnection() {
    try {

        const [rows] = await connection.query('SELECT 1');

        console.log("Database connected");

    } catch (error) {

        console.error("Database connection error", error);

    }
}

testConnection();