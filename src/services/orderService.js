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

async function getAllOrdersService() {
    const orders = await getAllOrders();
    return orders;
}

async function updateOrderService(orderId, body) {
    if (!orderId) throw new Error("Order ID inválido");

    const mappedOrder = mapOrderRequest(body);

    const result = await updateOrder(orderId, mappedOrder);
    if (!result) throw new Error("Pedido não encontrado");

    return orderId;
}

module.exports = { createOrderService, getOrderService, getAllOrdersService, updateOrderService };