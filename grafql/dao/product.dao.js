
export default class ProductDAO {
    constructor() {
        this.products = []
    }

    getAll() {
        return this.products
    }
    save(data) {
        this.products.push(data)
    }
    update(id, data) {
        console.log(id)
        const indexToUpdate = this.products.findIndex(product => product.id === id)
        if (indexToUpdate === -1) {
            throw new Error('no existe ese id')
        }
        const updated = { ...this.products[indexToUpdate], ...data }
        this.products[indexToUpdate] = updated
        return updated
    }
    delete(id) {
        const indexToDelete = this.products.findIndex(product => product.id === id)
        if (indexToDelete === -1) {
            throw new Error('no existe ese id')
        }
        const toDelete = this.products.splice(indexToDelete, 1)
        return toDelete
    }
}