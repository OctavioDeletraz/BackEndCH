const { promises: fs } = require('fs')

class Cart {
    constructor() {
        this.route = './cart.json'
    }

    async newCart() {
        try {
            const cart = JSON.parse(await fs.readFile(this.route, 'utf-8'))
            let newId;
            if (cart.length == 0) {
                newId = 1;
            } else {
                newId = cart[cart.length - 1].id + 1;
            }
            const newCart = {
                id: newId,
                timestamp: new Date(),
                products: []
            }
            cart.push(newCart)
            await fs.writeFile(this.route, JSON.stringify(cart, null, 2))
            return newCart
        } catch (error) {
            return (error)
        }
    }

    async getProductCartById(id_cart) {
        try {
            const cart = JSON.parse(await fs.readFile(this.route, 'utf-8'))
            const cartFiltered = cart.filter(elem => elem.id === (parseInt(id_cart)))
            console.log(cartFiltered)
            if (cartFiltered.length === 0) {
                return ({ error: 'Carrito no encontrado' })
            } else {
                const cartProducts = cartFiltered.find(elem => elem.products);
                console.log(cartProducts.products)
                return (cartProducts.products)
            }
        } catch (error) {
            return (error)
        }
    }

    async addToCart(id_cart, id) {
        try {
            const allCarts = JSON.parse(await fs.readFile(this.route, 'utf-8'))
            const cartFiltered = allCarts.filter(elem => elem.id === (parseInt(id_cart))) // carrito
            const products = JSON.parse(await fs.readFile('./products.json', 'utf-8'))
            const product = products.find(elem => elem.id === (parseInt(id))) //objeto de productos
            const cartProducts = cartFiltered.find(elem => elem.products);// traigo todos los productos
            //hacer checkeo de existencia
            if (cartFiltered.length === 0) {
                return ({ error: 'Carrito no encontrado' })
            } else {
                if (product === undefined) {
                    return ({ error: 'Producto no encontrado' })
                } else {
                    cartProducts.products.push(product) //pusheo el nuevo objeto producto.
                    await fs.writeFile(this.route, JSON.stringify(allCarts, null, 2))
                    return cartFiltered
                }
            }
        } catch (error) {
            return (error)
        }
    }

    async deleteCartById(id) {
        try {
            const allCarts = JSON.parse(await fs.readFile(this.route, 'utf-8'))
            const allCartsFiltered = allCarts.filter(elem => elem.id !== parseInt(id))
            if (allCartsFiltered.length === (allCarts.length)) {
                return ({ error: 'Carrito no encontrado' })
            } else {
                await fs.writeFile(this.route, JSON.stringify(allCartsFiltered, null, 2))
                return (allCartsFiltered)
            }
        } catch (error) {
            return (error)
        }
    }

    async deleteProductInCartById(id_cart, id) {
        try {
            const allCarts = JSON.parse(await fs.readFile(this.route, 'utf-8'))
            const cart = allCarts.filter(elem => elem.id === (parseInt(id_cart))) // carrito
            const products = JSON.parse(await fs.readFile('./productos.json', 'utf-8'))
            const product = products.find(elem => elem.id === (parseInt(id))) //objeto de productos
            const cartProducts = cart.find(elem => elem.products);// traigo todos los productos del carrito
            //hacer checkeo de existencia
            if (cart.length === 0) {
                return ({ error: 'Carrito no encontrado' })
            } else {
                if (product === undefined) {
                    return ({ error: 'Producto no encontrado en base de datos' })
                } else {
                    const indexProduct = cartProducts.products.findIndex((prod) => prod.id == parseInt(id))
                    if (indexProduct == -1) {
                        return ({ error: 'Producto no encontrado en el carrito' })
                    } else {
                        cartProducts.productos.splice(indexProduct, 1)// elimino
                        await fs.writeFile(this.route, JSON.stringify(allCarts, null, 2))
                        return cart
                    }
                }
            }
        } catch (error) {
            return (error)
        }
    }
}

const cartController = new Cart()
module.exports = cartController