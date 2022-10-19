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
            fs.writeFileSync(`./${this.route}`, JSON.stringify([]))
            console.log("Se eliminaron todos los registros")
        } catch (error) {
            console.log(`No se pudieron eliminar los productos ${error}`)
        }
    }

    async getNextId() {
        try {
            let products = await this.getAll();
            let nextId
            if (products.length > 0) {
                nextId = parseInt(products[products.length - 1].id) + 1;
            } else {
                nextId = 1
            }
            return nextId
        } catch (error) {
            console.log("No se pudo obtener id", error)
        }

    }

    async save(product) {
        console.log("Guardando...", product)
        let nextId = await this.getNextId()
        product.id = nextId
        const allProductsArray = await this.getAll()
        allProductsArray.push(product)
        this.write(allProductsArray, `./${this.route}`)
    }

}
module.exports = Contenedor


