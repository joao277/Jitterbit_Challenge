const { createOrderController } = require('../controllers/orderController');

const orderRouter = {
    routes: [
        {
            method: 'POST',
            path: '/order',
            handler: createOrderController
        }

    ]
};

module.exports = orderRouter;