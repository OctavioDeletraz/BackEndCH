const express = require('express')
const { Router } = express;
const app = express();
const router = Router();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productos = require("./productos.json")
router.get('/productos', (req, res, next) => {
    res.json(productos)
})
router.get('/productos/:id', (req, res, next) => {
    const { id } = req.params
    const producto = productos.find(elem => elem.id == id)
    res.json(producto)
})
router.post('/productos', (req, res, next) => {
    const body = req.body
    // me quede aca
})
router.put('/productos/:id', (req, res, next) => { })
router.delete('/productos/:id', (req, res, next) => { })

app.use("/api", router)
app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080")
    console.log("http://localhost:8080")
})

module.exports = app;