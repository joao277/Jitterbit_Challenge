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

async function getOrderById(orderId) {
    const conn = await connection.getConnection();
    try {
        const [orders] = await conn.query(
            'SELECT * FROM Orders WHERE orderId = ?',
            [orderId]
        );

        if (orders.length === 0) return null;
        const order = orders[0];

        const [items] = await conn.query(
            'SELECT productId, quantity, price FROM Items WHERE orderId = ?',
            [orderId]
        );

        return {
            orderId: order.orderId,
            value: order.value,
            creationDate: order.creationDate,
            items: items
        };
    } finally {
        conn.release();
    }
}

module.exports = { createOrder, getOrderById };