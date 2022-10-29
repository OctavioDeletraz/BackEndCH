const fs = require('fs');

class Contenedor {

    constructor(route) {
        this.route = route
    }

    async getAll() {
        let allProductsArray = []
        try {
            let allProductsString = fs.readFileSync(`./${this.route}`, "utf8");
            allProductsString.length > 0
                ? (allProductsArray = JSON.parse(allProductsString))
                : (allProductsArray = []);
        } catch (error) {
            console.log("Error en la lectura del archivo", error)
        }
        return allProductsArray
    }

    async write(allProductsArray) {
        let allProductsString = JSON.stringify(allProductsArray);
        try {
            await fs.writeFileSync(`./${this.route}`, allProductsString);
        } catch (error) {
            console.log("Error de escritura", error);
        }
    }

    async deleteById(id) {
        try {
            const products = await this.getAll()
            const productsFiltered = products.filter(elem => elem.id !== id)
            if (products.length === productsFiltered.length) {
                console.log("No existe el id")
                return null
            } else {
                this.write(productsFiltered)
                console.log(`Se elimino correctamente el producto de id: ${id}`)
            }
        } catch (error) {
            console.log(`No se pudo eliminar: ${error}`)
        }
    }

    async getById(id) {
        try {
            const products = await this.getAll()
            const productsFiltered = products.filter(elem => elem.id == id)
            if (productsFiltered.length == 0) {
                console.log("Id inexistente")
            }
            return productsFiltered
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            fs.unlinkSync(`./${this.route}`)
            console.log("Se eliminaron todos los registros")
        } catch (error) {
            console.log(`No se pudieron eliminar los productos ${error}`)
        }
    }

    async save(product) {
        if (fs.existsSync('./products.json')) {
            const data = JSON.parse(fs.readFileSync(`./${this.route}`, 'utf-8'))
            const lastProd = data[data.length - 1]
            product.id = lastProd.id + 1
            data.push(product)
            fs.writeFileSync(`./${this.route}`, `${JSON.stringify(data)}`)
        } else {
            const array = []
            product.id = 1
            array.push(product)
            fs.writeFileSync('./products.json', `${JSON.stringify(array)}`)
        }
    }

    async update(product) {
        try {
            // buscar toda la lista, reemplazar el producto por el nuevo, guardar la lista
            const products = await this.getAll()
            products.map((elem) => {
                if (elem.id === parseInt(product.id)) {
                    elem.title = product.title;
                    elem.price = product.price;
                    elem.thumbnail = product.thumbnail;
                }
            })
            console.log(products);
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Contenedor


