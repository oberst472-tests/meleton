const {Router} = require('express')
const {all, add} = require('../controllers/products.controller')
const router = Router()

router.get('/', all)
router.post('/', add)



module.exports = router
