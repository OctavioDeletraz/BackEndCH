const express = require("express")
const app = express()

const Contenedor = require('./productsMethods')

const routerProd = express.Router()
const contenedor1 = new Contenedor('/products.json')

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/products', routerProd)

let vista = Boolean(true)

app.get('/', (req, res) => {
    vista = true
    res.render('pages/index', { vista });
})

routerProd
    .get('/', async (req, res) => {
        vista = false
        const products = await contenedor1.getAll()
        res.render('pages/index', { vista, products });
    })
    .post('/', (req, res) => {
        // luego del guardado
        const body = req.body
        const newProduct = contenedor1.save(body)
        vista = true

        res.render('pages/index', { vista, newProduct });
    })

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on('error', (err) => console.log(err.message))