const jsonServer = require('json-server');
const db = require('./db.json');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.method = 'GET';
        req.query = req.body;
    }
    // Continue to JSON Server router
    next();
});

server.use(
    jsonServer.rewriter({
        '/api/*': '/$1',
        '/login/web': '/loginWeb',
        '/logout/web': '/logoutWeb',
        '/user/info': '/getUserInfo',
    })
);

// Use default router
server.use(router);
server.listen(3004, () => {
    console.log('JSON Server is running port: ', 3004);
});
