const { promises: fs } = require('fs')
const { emitKeypressEvents } = require('readline')

class Products {
    constructor() {
        this.route = './products.json'
    }
    async getAll() {
        try {
            const products = JSON.parse(await fs.readFile(this.route, 'utf-8'))
            return products
        } catch (error) {
            return []
        }
    }
    async getById(id) {
        try {
            const products = await this.getAll()
            const productsFiltered = products.filter(e => e.id === (parseInt(id)))
            if (productsFiltered.length === 0) {
                return ({ error: 'producto no encontrado' })
            } else {
                return (productsFiltered)
            }
        } catch (error) {
            return ({ error })
        }
    }

    async write(allProductsArray) {
        let allProductsString = JSON.stringify(allProductsArray);
        try {
            await fs.writeFileSync(this.route, allProductsString);
        } catch (error) {
            console.log("Error de escritura", error);
        }
    }

    async save(product) {
        try {
            const products = await this.getAll()
            let newId;
            if (products.length == 0) {
                newId = 1;
            } else {
                newId = products[products.length - 1].id + 1;
            }
            product.id = newId
            products.push(product);
            await fs.writeFile(this.route, JSON.stringify(products, null, 2))
            return (product)
        } catch (error) {
            return (error)
        }
    }

    async update(product, id) {
        try {
            const products = await this.getAll()
            const prodIndex = products.findIndex(prod => prod.id == parseInt(id))
            if (prodIndex === -1) {
                return ({ error: 'producto no encontrado' })
            } else {
                products[prodIndex] = { id, ...product };
                await this.write(products);
                return (products)
            }
        } catch (error) {
            return (error)
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
}

const productController = new Products()

module.exports = productController