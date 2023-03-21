import express from "express";
import GraphqlProductController from "./controller/product.controller.js";
const app = express()

app.use(express.static("public"))


app.use('/graphql', new GraphqlProductController())

const port = 8080

const server = app.listen(port, () => {
    console.log("escuchando en 8080")
})

server.on('error', (error) => {
    console.log(error)
})