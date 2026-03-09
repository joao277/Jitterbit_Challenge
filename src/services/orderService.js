const { mapOrderRequest } = require('../utils/orderMapper');
const { createOrder } = require('../repositories/orderRepository');

async function createOrderService(body) {
    const mappedOrder = mapOrderRequest(body);

    await createOrder(mappedOrder);

    return mappedOrder.orderId;
}

async function getOrderService(orderId) {
    if (!orderId) throw new Error("Order ID inválido");

    const order = await getOrderById(orderId);

    if (!order) throw new Error("Pedido não encontrado");

    return {
        orderId: order.orderId,
        value: order.value,
        creationDate: order.creationDate,
        items: order.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    };
}

module.exports = { createOrderService, getOrderService };