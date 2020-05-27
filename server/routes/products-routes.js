const {Router} = require('express')
const {all, add, del, productById, update} = require('../controllers/products.controller')
const router = Router()

router.get('/', all)
router.post('/', add)
router.delete('/:id', del)
router.get('/:id', productById)
router.patch('/:id', update)



module.exports = router
