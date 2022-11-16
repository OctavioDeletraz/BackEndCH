const express = require("express")
const app = express()
const Contenedor = require('./productsMethods')
const routerProd = express.Router()
const contenedor1 = new Contenedor('/products.json')
const pug = require('pug');


app.set('views', './views')
app.set('view engine', 'pug');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/products', routerProd)

let vista = Boolean(true)

app.get('/', (req, res) => {
    vista = true
    res.render('index', { vista });
})

routerProd
    .get('/', async (req, res) => {
        const products = await contenedor1.getAll()
        vista = false
        res.render('index', { products, vista });
    })
    .post('/', async (req, res) => {
        // luego del guardado
        const body = req.body
        const newProduct = await contenedor1.save(body)
        vista = true
        console.log(newProduct)
        res.render('index', { newProduct, vista });
    })

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on('error', (err) => console.log(err.message))