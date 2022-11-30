import express from 'express'
const app = express()

import { createServer } from "http";
import { Server } from "socket.io";

import { config } from './config/mariaDB.js'
import { options } from './config/sqlite3.js'
import Contenedor from './controllers/productsMethods.js'

const ProductController = new Contenedor(config)

import Chats from './controllers/Chats.js'
const historial = new Chats(options)

const httpServer = new createServer(app)
const io = new Server(httpServer)

ProductController.createTable()
    .then(() => {
        console.log('tabla Articulos creada');

        const articulos = [
            {
                "title": "Pincel",
                "price": 200,
                "thumbnail": "",
                "id_articulo": 1
            },
            {
                "title": "Taladro",
                "price": 8000,
                "thumbnail": "",
                "id_articulo": 2
            },
            {
                "title": "Destornillador",
                "price": 180,
                "thumbnail": "",
                "id_articulo": 3
            },
        ]
        return ProductController.save(articulos)
    })
    .then(() => {
        console.log('articulos insertados');
    })
    .catch((error) => {
        console.log(error);
        throw error;
    })
// .finally(() => {
//     ProductController.close();
// });

historial.createTable()
    .then(() => {
        console.log('tabla chats creada');

        const chats = [
            {
                "email": "Eze",
                "date": "04/09/2022",
                "textoMensaje": "Buenas tardes",
                "id_chat": 1
            },
            {
                "email": "Lola",
                "date": "04/09/2022",
                "textoMensaje": "Hola, que tal?",
                "id_chat": 2
            },
            {
                "email": "Lola",
                "date": "04/09/2022",
                "textoMensaje": "Como estas?",
                "id_chat": 3
            },
            {
                "email": "Eze",
                "date": "04/09/2022",
                "textoMensaje": "bien, y vos?",
                "id_chat": 4
            },
        ]
        return historial.saveChat(chats)
    })
    .then(() => {
        console.log('Chats insertados');
    })
    .catch((error) => {
        console.log(error);
        throw error;
    })
// .finally(() => {
//     ProductController.close();
// });


// creo que se tiene que ir

app.set('view engine', 'ejs')
app.set('views', './public/views');


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//webSocket
io.on('connection', async (socket) => {
    console.log('Un cliente se ha conectado');

    //productos
    socket.emit("productos", await ProductController.getAll())
    socket.on("guardarNuevoProducto", (nuevoProducto) => {
        ProductController.save(nuevoProducto)
        io.sockets.emit("productos", ProductController.getAll())
    })

    //mensajes

    const messages = await historial.getAllChats()
    socket.emit('messages', messages);

    socket.on('messegesNew', async (data) => {
        const newMessage = {
            email: data.email,
            textoMensaje: data.textoMensaje,
            date: new Date
        }
        const historialSave = await historial.saveChat(newMessage)
        io.sockets.emit('messages', historialSave);
    });
});

//CRUD
app.get('/', async (req, res, next) => {
    const prod = await ProductController.getAll()
    res.render('pages/index', { prod })
})

app.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const prod = await ProductController.getById(id)
    res.render('pages/index', { prod })
})

app.post('/', async (req, res, next) => {
    const body = req.body
    await ProductController.save(body)
    const prod = await ProductController.getAll()
    res.render('pages/index', { prod })
})

app.put('/:id', async (req, res, next) => {
    const body = req.body
    const { id } = req.params;
    const upDateProduct = await ProductController.update(body, id)
    console.log(upDateProduct)
    const prod = await ProductController.getAll()
    res.render('pages/index', { prod })
})

app.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const deleteProduct = await ProductController.deleteById(id)
    console.log(deleteProduct)
    const prod = await ProductController.getAll()
    res.render('pages/index', { prod })
})

const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))