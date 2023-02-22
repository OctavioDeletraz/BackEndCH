const Products = require('../models/modelProducts')

const getProducts = async (req,res)=>{
        try {
            const allCarts = await Products.find()
            return allCarts
        } catch (error) {
            console.log(error)
        }
    }
const insertProduct = async (req,res)=>{
        try {
            await Products.create(req)
        } catch (error) {
            console.log(error)
        }
    }

module.exports = {insertProduct, getProducts}