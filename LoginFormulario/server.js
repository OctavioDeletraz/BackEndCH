const express = require('express');
const app = express();
const routerProducts = require('./routes/products/index.js')
const authWebRouter = require('./routes/web/auth.js')
// import {productosVariable} from './routes/products/index.js'
const { faker } = require('@faker-js/faker')
faker.locale = 'es'
const mensajeController = require('./controllers/ContenedorMensajes.js')
const productosController = require('./controllers/ContenedorProductos.js')
const { createServer } = require("http");
const { Server } = require("socket.io");
const { normalize, schema, denormalize } = require('normalizr');

const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoURlString = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASS}@clustercoder.rrnnvzr.mongodb.net/?retryWrites=true&w=majority`

app.use(cookieParser());
app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoURlString,
        mongoOptions: advancedOptions
    }),
    secret: 'coder19dic',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    }
}));

const httpServer = new createServer(app)
const io = new Server(httpServer)

app.set('view engine', 'ejs')
app.set('views', './public/views');

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//faker para agregar a mongo

// function getRandomProduct(id_articulo) {
//     return {
//         id_articulo,
//         title: faker.commerce.product(),
//         price: faker.commerce.price(),
//         thumbnail: faker.image.abstract()
//     }
//   }

//   const productos = []
//     for (let i = 1; i < 6; i++) {
//         productos.push(getRandomProduct(i))
//     }
//     const productosRandom = await productosController.save(productos)

// webSocket

io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado');
    //User
    socket.on("loginUsuario", (logUser) => {
        socket.emit("user", logUser)
    })

    //productos
    const productos = await productosController.getAll()
    socket.emit("productos", productos)

    socket.on("guardarNuevoProducto", async (nuevoProducto) => {
        const newProducto = await productosController.save(nuevoProducto)
        io.sockets.emit("productos", newProducto)
    })

    //Normalizr
    function normalizeAll(getAllMessages) {
        const newGetAllMessages = getAllMessages.map((e) => {
            const allMessagesObject = {
                author: e.author,
                date: e.date,
                text: e.text
            }
            return allMessagesObject
        })
        const chatOriginal = {
            id: 'mensajes',
            mensajes: newGetAllMessages
        }
        const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });
        const schemaMensaje = new schema.Entity('text', { author: schemaAuthor })
        const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] })
        const normalizarMensajes = normalize(chatOriginal, schemaMensajes)
        const sinNorm = JSON.stringify(newGetAllMessages).length
        const norm = JSON.stringify(normalizarMensajes).length
        const porcentajeCompr = 100 - ((norm * 100) / sinNorm)
        const chatDenormalized = denormalize(chatOriginal, normalizarMensajes)
        const compr = Math.round(porcentajeCompr * 100) / 100
        return { chatDenormalized, compr }
    }
    // mensajes web socket
    const messages = await mensajeController.getAll()
    socket.emit('messages', normalizeAll(messages));

    socket.on('messegesNew', async (data) => {
        const newNormMessage = {
            author: {
                id: data.author.email,
                nombre: data.author.nombre,
                apellido: data.author.apellido,
                edad: data.author.edad,
                alias: data.author.alias,
                avatar: data.author.avatar
            },
            date: new Date,
            text: data.text
        }
        const historialSave = await mensajeController.save(newNormMessage)
        io.sockets.emit('messages', normalizeAll(historialSave));
    });
});

//CRUD
app.use(authWebRouter)
app.use(routerProducts)

//Server
const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))