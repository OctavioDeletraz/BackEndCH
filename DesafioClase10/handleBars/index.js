const express = require('express')
const handlebars = require('express-handlebars')
const Contenedor = require('./productsMethods.js')
const app = express()
const routerProd = express.Router()
const contenedor1 = new Contenedor('/products.json')

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/products', routerProd)

app.get('/', (req, res) => {
    res.render('form');
})

routerProd
    .get('/', (req, res) => {
        const products = contenedor1.getAll()
        res.render('table', { products });
    })
    .post('/', (req, res) => {
        // luego del guardado
        const body = req.body
        contenedor1.save(body)
        res.render('form');
    })

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on('error', (err) => console.log(err.message))