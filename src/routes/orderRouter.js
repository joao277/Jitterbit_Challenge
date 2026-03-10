const { createOrderController, getOrderController, getAllOrdersController, updateOrderController, deleteOrderController } = require('../controllers/orderController');

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
        },
        { 
            method: 'DELETE', 
            path: '/order/:id', 
            handler: deleteOrderController 
        }

    ]
};

module.exports = orderRouter;