const express = require('express')
const Contenedor = require('./productsMethods')

const app = express()
const products = new Contenedor('products.json')

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/products', async (req, res) => {
    const prods = await products.getAll()
    res.send(prods)
})

app.get('/productsRandom', async (req, res) => {
    const prods = await products.getAll()
    const randomId = parseInt(Math.random() * prods.length)
    console.log(randomId)
    res.send(prods[randomId])
})