import Joi from 'joi'


class Product {

    constructor(tittle, desc, img, price) {
        this.tittle = tittle
        this.desc = desc
        this.img = img
        this.price = price
    }

    equals(product) {
        if (!(product instanceof Product)) {
            return false
        }
        if (this.tittle != product.tittle) {
            return false
        }
        if (this.desc != product.desc) {
            return false
        }
        if (this.img != product.img) {
            return false
        }
        if (this.price != product.price) {
            return false
        }
        return true
    }

    static validar(product, required) {
        const ProductSchema = Joi.object({
            tittle: required ? Joi.string().required() : Joi.string(),
            desc: required ? Joi.string().required() : Joi.string(),
            img: required ? Joi.string().required() : Joi.string(),
            price: required ? Joi.string().required() : Joi.string()
        })

        const { error } = ProductSchema.validate(product)
        if (error) {
            throw error
        }
    }
}

export default Product