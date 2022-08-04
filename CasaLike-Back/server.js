const express = require('express');
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');

const app = express();
const http = require('http').createServer(app);
const dbService = require('./services/db.service.js');


const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});

app.use(express.json());
app.use(session);
app.use(express.static('public'));

let config;
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
    config = require('./config/prod')
} else {
    config = require('./config/dev')
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    //app.use(cors())
    app.use(cors(corsOptions))
};

const authRoutes = require('./api/auth/auth.routes.js');
const userRoutes = require('./api/user/user.routes.js');
const stayRoutes = require('./api/stay/stay.routes.js');
const orderRoutes = require('./api/order/order.routes.js');
// sockets

const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware');
app.all('*', setupAsyncLocalStorage);

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stay', stayRoutes);
app.use('/api/order', orderRoutes);

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

const logger = require('./services/logger.service.js');
const port = process.env.PORT || 3030;

const bootstarp = async () => {
    await dbService.connect();
    http.listen(port, () => {
        logger.info('Server is running on port: ' + port)
    })
};

bootstarp();

