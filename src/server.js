const http = require('http');
const { route } = require('./routes/index');

const PORT = 3000;

const server = http.createServer((req, res) => {
    route(req, res);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});