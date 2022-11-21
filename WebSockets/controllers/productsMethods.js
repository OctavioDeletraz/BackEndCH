const { promises: fs } = require('fs')

class Contenedor {
    constructor(router) {
        this.route = router
    }


    async getAll() {
        try {
            const content = JSON.parse(await fs.readFile(`./products.json`, 'utf-8')) // que paso con this.route
            return content
        } catch (error) {
            return []
        }
    }

    async getById(id) {
        try {
            const products = await this.getAll()
            const productsFiltered = products.filter(elem => elem.id == id)
            if (productsFiltered.length == 0) {
                return ({ error: 'producto no encontrado' })
            } else {
                productsFiltered
            }
        } catch (error) {
            console.log(error)
        }
    }

    async write(allProductsArray) {
        let allProductsString = JSON.stringify(allProductsArray);
        try {
            await fs.writeFileSync(`./products.json`, allProductsString);
        } catch (error) {
            console.log("Error de escritura", error);
        }
    }

    async deleteById(id) {
        try {
            const products = await this.getAll()
            const productsFiltered = products.filter(elem => parseInt(elem.id) !== parseInt(id))

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


    async deleteAll() {
        try {
            fs.unlinkSync(`./products.json`)
            console.log("Se eliminaron todos los registros")
        } catch (error) {
            console.log(`No se pudieron eliminar los productos ${error}`)
        }
    }

    async save(product) {
        try {
            const products = JSON.parse(await fs.readFile(`./products.json`, 'utf-8'))
            let newId;
            if (products.length == 0) {
                newId = 1;
            } else {
                newId = products[products.length - 1].id + 1;
            }
            product.id = newId
            products.push(product);
            await fs.writeFile(`./products.json`, JSON.stringify(products, null, 2))
            return (product)
        } catch (error) {
            return (error)
        }
    }

    async update(product, id) {
        try {
            const products = await this.getAll()
            const prodIndex = products.findIndex(prod => prod.id == parseInt(id))
            products[prodIndex] = { id, ...product };
            this.write(products);
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = Contenedor


