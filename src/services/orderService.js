const { mapOrderRequest } = require('../utils/orderMapper');
const { createOrder } = require('../repositories/orderRepository');

async function createOrderService(body) {
    const mappedOrder = mapOrderRequest(body);

    await createOrder(mappedOrder);

    return mappedOrder.orderId;
}

module.exports = { createOrderService };