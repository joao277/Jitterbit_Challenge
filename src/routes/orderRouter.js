const { createOrderController } = require('../controllers/orderController');
const { createOrderController, getOrderController } = require('../controllers/orderController');

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
        }

    ]
};

module.exports = orderRouter;