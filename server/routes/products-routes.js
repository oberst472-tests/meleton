const {Router} = require('express')
const {all} = require('../controllers/products.controller')
const router = Router()

router.get('/', all)



module.exports = router
