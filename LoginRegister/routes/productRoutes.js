
const {Router} = require('express');
const router = Router();

const {getProducts} = require('../controllers/products')
const {getMessages} = require('../controllers/messages');



router.get('/', async  (req, res) => {
        const products = await getProducts()
        const messages = await getMessages()
        const jsScriptMain = 'public/main.js'
        return res.render('index', {products, messages, jsScriptMain });
})



module.exports = router;