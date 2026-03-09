const { createOrderService } = require('../services/orderService');

async function createOrderController(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', async () => {
        try {
            if (!body) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: "Body vazio" }));
            }

            const jsonBody = JSON.parse(body);
            const orderId = await createOrderService(jsonBody);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: `Pedido ${orderId} criado com sucesso` }));
        } catch (err) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    });
}

async function getOrderController(req, res) {
    try {
        const parts = req.url.split('/');
        const orderId = parts[2];

        if (!orderId) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Order ID não informado' }));
        }

        const order = await getOrderService(orderId);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(order));
    } catch (err) {
        const status = err.message === 'Pedido não encontrado' ? 404 : 400;
        res.writeHead(status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
    }
}

async function getAllOrdersController(req, res) {
    try {
        const orders = await getAllOrdersService();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(orders));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro ao buscar pedidos: ' + err.message }));
    }
}

module.exports = { createOrderController, getOrderController, getAllOrdersController };