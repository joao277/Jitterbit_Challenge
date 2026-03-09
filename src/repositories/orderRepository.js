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

async function getAllOrders() {
    const conn = await connection.getConnection();
    try {
        const [orders] = await conn.query('SELECT * FROM Orders');

        const results = [];
        for (const order of orders) {
            const [items] = await conn.query(
                'SELECT productId, quantity, price FROM Items WHERE orderId = ?',
                [order.orderId]
            );

            results.push({
                orderId: order.orderId,
                value: order.value,
                creationDate: order.creationDate,
                items: items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }))
            });
        }

        return results;
    } finally {
        conn.release();
    }
}

async function updateOrder(orderId, order) {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        const [orders] = await conn.query('SELECT * FROM Orders WHERE orderId = ?', [orderId]);
        if (orders.length === 0) {
            await conn.rollback();
            return null;
        }

        const sqlUpdateOrder = `UPDATE Orders SET value = ?, creationDate = ? WHERE orderId = ?`;
        await conn.query(sqlUpdateOrder, [order.value, order.creationDate, orderId]);

        await conn.query('DELETE FROM Items WHERE orderId = ?', [orderId]);

        const sqlItem = `INSERT INTO Items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)`;
        for (const item of order.items) {
            await conn.query(sqlItem, [orderId, item.productId, item.quantity, item.price]);
        }

        await conn.commit();
        return true;

    } catch (err) {
        await conn.rollback();
        throw err;
    } finally {
        conn.release();
    }
}

module.exports = { createOrder, getOrderById, getAllOrders, updateOrder };