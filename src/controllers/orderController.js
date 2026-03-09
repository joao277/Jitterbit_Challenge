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

module.exports = { createOrderController };