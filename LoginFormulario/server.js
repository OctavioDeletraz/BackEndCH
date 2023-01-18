require('dotenv').config()
const express = require('express')
const morgan = require('morgan');
const routeProducts = require('./routes/productRoutes')
const routeLogin = require('./routes/loginRoute')
const routeRegister = require('./routes/registerRoute')
const routeLogout = require('./routes/logoutRoute')
const routeInfo = require('./routes/infoRoute')
const routeRandom = require('./routes/randomRoute')
const path = require('path');
const { Server: IOServer } = require('socket.io')
const http = require('http');
const app = express()
const PORT = 8081
const MongoConnnection = require('./config/mongooseConection')
const productsAccsess = new MongoConnnection()
const MongoConnnectionChat = require('./config/mongooseConectionChat')
const chatAccess = new MongoConnnectionChat()

require('dotenv').config()



const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const httpServer = http.createServer(app)
const io = new IOServer(httpServer)


app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use(session({
    store: MongoStore.create({ mongoUrl: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@ecommercecoderhousesant.6p5agbc.mongodb.net/sessions?retryWrites=true&w=majority`, mongoOptions: advancedOptions }),
    secret: 'algo',
    resave: false,
    saveUninitialized: false
}))

app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');


app.use(routeProducts)
app.use(routeLogin)
app.use(routeRegister)
app.use(routeLogout)
app.use(routeInfo)
app.use(routeRandom)

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}
app.get('/', isAuth, (req, res) => {
    res.redirect('/api/productos')
})

io.on('connection', async (socket) => {
    console.log('New user connected. Socket ID : ', socket.id);

    socket.emit('products', await productsAccsess.getProducts());

    socket.on('update-product', async product => {

        await productsAccsess.insertProduct(product)
        io.sockets.emit('products', await productsAccsess.getProducts())
    })

    socket.emit('messages', await chatAccess.getMessages())

    socket.on('update-message', async message => {
        await chatAccess.insertMessage(message)
        io.sockets.emit('messages', await chatAccess.getMessages());
    })
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
}
)

const server = httpServer.listen(PORT, () =>
    console.log(
        `Server started on PORT http://localhost:${PORT} at ${new Date().toLocaleString()}`
    )
);

server.on('error', (err) => {
    console.log('Error en el servidor:', err)
})