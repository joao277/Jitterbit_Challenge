const { createOrderController, getOrderController, getAllOrdersController, updateOrderController } = require('../controllers/orderController');

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
        },
        { 
            method: 'PUT', 
            path: '/order/:id', 
            handler: updateOrderController 
        }

    ]
};

module.exports = orderRouter;