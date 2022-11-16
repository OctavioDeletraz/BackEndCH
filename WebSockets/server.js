const express = require("express")
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const Contenedor = require('./controllers/productsMethods')
const productController = new Contenedor('./products.json')
const Chats = require('./controllers/Chats')
const historial = new Chats('./chats.json')
const app = express()

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

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
    socket.emit("productos", await productController.getAll())
    socket.on("guardarNuevoProducto", (nuevoProducto) => {

        productController.save(nuevoProducto)
        io.sockets.emit("productos", productController.getAll)
    })

    //mensajes

    const messages = await historial.getAllChats()
    socket.emit('messages', messages);

    socket.on('messegesNew', async (data) => {
        const historialSave = await historial.saveChats(data)
        io.sockets.emit('messages', historialSave);
    });
});

//CRUD
app.get('/', async (req, res, next) => {
    const prod = await productController.getAll()
    res.render('pages/index', { prod })
})

app.get('/:id', async (req, res, next) => {
    const { id } = req.params
    const prod = await productController.getById(id)
    res.render('pages/index', { prod })
})

app.post('/', async (req, res, next) => {
    const body = req.body
    const newProduct = await productController.save(body)
    console.log(newProduct)
    const prod = await productController.getAll()
    res.render('pages/index', { prod })
})

app.put('/:id', async (req, res, next) => {
    const body = req.body
    const { id } = req.params;
    const upDateProduct = await productController.update(body, id)
    console.log(upDateProduct)
    const prod = await productController.getAll()
    res.render('pages/index', { prod })
})

app.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const deleteProduct = await productController.deleteById(id)
    console.log(deleteProduct)
    const prod = await productController.getAll()
    res.render('pages/index', { prod })
})

const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))