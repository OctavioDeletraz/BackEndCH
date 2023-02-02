const {Router} = require('express');
const router = Router();
const logger = require('../utils/logger')
const {getRandom} = require('../utils/getRandom')

//http://localhost:8081/api/randoms?cant=1000

router.get("/", (req, res) => {
    logger.info("🔸Route: /api/randoms 🔸Method: GET ");
    if (!req.query.cant) {
        logger.error(
            `🔸Route: /api/randoms 🔸Method: GET 🔸Error: cantidad no especificada`
        );
        res.status(400).send("Debe indicar la cantidad de números a generar");
    } else {
        const cant = req.query.cant;
        const randoms = getRandom(cant);
        res.send(randoms);
    }
});

module.exports = router;