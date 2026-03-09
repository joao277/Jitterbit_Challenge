const { createOrderController, getOrderController, getAllOrdersController } = require('../controllers/orderController');

const orderRouter = {
    routes: [
        {
            method: 'POST',
            path: '/order',
            handler: createOrderController
        },
        {
            method: 'GET',
            path: '/order/:id',
            handler: getOrderController
        },
        {
            method: 'GET',
            path: '/order/list',
            handler: getAllOrdersController
        }

    ]
};

module.exports = orderRouter;