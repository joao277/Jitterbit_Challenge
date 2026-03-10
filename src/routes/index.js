const orderRouter = require('./orderRouter');

const routers = [
    orderRouter

];

function router(req, res) {
    const url = req.url.split('?')[0];
    const method = req.method;

    for (const r of routers) {
        for (const route of r.routes) {
            if (route.method === method && route.path === url) {
                return route.handler(req, res);
            }
        }
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Rota não encontrada' }));
}

module.exports = { router };