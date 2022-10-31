const express = require('express')
const { Router } = express;
const router = Router();
const Contenedor = require('./productsMethods')
const app = express()
const products = new Contenedor('/products.json')

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));
app.use("/api", router)

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))


router.get('/products', async (req, res, next) => {
    const prods = await products.getAll()
    res.send(prods)
})

router.get('/products/:id', async (req, res, next) => {
    const { id } = req.params
    const product = await products.getById(parseInt(id))
    res.json(product)
})

router.post('/products', async (req, res, next) => {
    const body = req.body
    await products.save(body)
    res.send(body)
    // me quede aca
})
router.put('/products/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const item = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        }
        await products.update(item, id)
        res.send("Usuario actualizado")
    } catch (error) {
        console.log(error)
    }
})

router.delete('/products/:id', async (req, res, next) => {
    const id = req.params.id
    await products.deleteById(id)
    res.json("Producto eliminado")
})

module.exports = app;

