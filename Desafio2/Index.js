const fs = require('fs');

class Contenedor {

    // constructor(route) {
    //     this.route = route
    // }

    async getAll(file) {
        let allProductsArray = []
        try {
            let allProductsString = fs.readFileSync(file, "utf8");
            allProductsString.length > 0
                ? (allProductsArray = JSON.parse(allProductsString))
                : (allProductsArray = []);
        } catch (error) {
            console.log("Error en la lectura del archivo", error)
        }
        return allProductsArray
    }

    async write(allProductsArray, file) {
        let allProductsString = JSON.stringify(allProductsArray);
        try {
            await fs.writeFileSync(file, allProductsString);
        } catch (error) {
            console.log("Error de escritura", error);
        }
    }

    async deleteById(id, file) {
        try {
            const products = await this.getAll(file)
            const productsFiltered = products.filter(elem => elem.id !== id)
            if (products.length === productsFiltered.length) {
                console.log("No existe el id")
                return null
            } else {
                this.write(productsFiltered, file)
                console.log(`Se elimino correctamente el producto de id: ${id}`)
            }
        } catch (error) {
            console.log(`No se pudo eliminar: ${error}`)
        }
    }

    async getById(id, file) {
        try {
            const products = await this.getAll(file)
            const productsFiltered = products.filter(elem => elem.id == id) ?? null
            return productsFiltered
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(file) {
        try {
            fs.writeFileSync(file, JSON.stringify([]))
        } catch (error) {
            console.log(`No se pudieron eliminar los productos ${error}`)
        }
    }

    async getNextId(file) {
        try {
            let products = await this.getAll(file);
            let nextId = parseInt(products[products.length - 1].id) + 1;
            if (products.filter(elem => elem.id === nextId).length == 0) {
                return nextId
            } else {
                console.log("No se pudo obtener id")
                return []
            }
        } catch (error) {
            console.log("No se pudo obtener id", error)
        }

    }

    async save(product, file) {
        console.log("Guardando...", product)
        let nextId = await this.getNextId(file)
        product.id = nextId
        const allProductsArray = await this.getAll(file)
        allProductsArray.push(product)
        this.write(allProductsArray, file)
    }

}
module.exports = Contenedor


