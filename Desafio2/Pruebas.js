const Contenedor = require('./Index')

async function main() {
    const products = new Contenedor('products.json')

    const file = "./Products.json"

    // Prueba para obtener todos los productos
    console.log(await products.getAll(file))

    // Prueba para borrar un producto por id, y mostrar resultados en pantalla
    await products.deleteById(3, file)
    console.log(await products.getAll(file))

    // Prueba para obtener un producto especifico por id, y mostrarlo por pantalla
    const productId = await products.getById(2, file)
    console.log(productId)

    // Prueba para eliminar todos los productos y mostrar el array vacio
    await products.deleteAll(file)
    console.log(await products.getAll(file))


    // Nuevo objeto para agregar al array de productos
    const newProduct = {
        "title": "Taladro",
        "price": "14000",
        "thumbnail": "",
    }

    // Prueba para guardar un nuevo producto en la base de datos
    await products.save(newProduct, file)
    console.log(await products.getAll(file))
}
main()
