const connection = require('../database/connection');

async function createOrder(order) {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const sqlOrder = `INSERT INTO Orders (orderId, value, creationDate) VALUES (?, ?, ?)`;
        await conn.query(sqlOrder, [order.orderId, order.value, order.creationDate]);

        const sqlItem = `INSERT INTO Items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)`;
        for (let item of order.items) {
            await conn.query(sqlItem, [order.orderId, item.productId, item.quantity, item.price]);
        }

        await conn.commit();
    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}

module.exports = { createOrder };