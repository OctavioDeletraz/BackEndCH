const fs = require('fs');

class Contenedor {

    constructor(route) {
        this.route = route
    }

    getProducts() {
        fs.promises.readFile(`./${this.route}`, 'utf-8')
            .then(content => {
                console.log('Productos.json se leyó correctamente: ');
                const products = JSON.parse(content);
                console.log(products);
            })
            .catch(err => console.log(err))
    }

    deleteById(id) {
        fs.promises.readFile(`./${this.route}`, 'utf-8')
            .then(content => {
                const products = JSON.parse(content);
                const productsFilteredJson = products.filter(elem => elem.id !== id)
                if (products.length === productsFilteredJson.length) {
                    console.log("No existe el id")
                    return
                }
                fs.promises.writeFile(`./${this.route}`, JSON.stringify(productsFilteredJson, null, 2))
                    .then(() => console.log('El producto se eliminó correctamente'))
                    .catch(err => console.log(`No se pudo eliminar: ${err.message}`))
            })
            .catch(err => console.log(err))
    }
}

const ruta = new Contenedor('products.json')
ruta.getProducts()
// Aca pruebo de borrar un producto que no existe
ruta.deleteById(8)
ruta.deleteById(1)