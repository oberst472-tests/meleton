const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, '../../mocks', 'products.json')
const readFile = async path => {
    try {
        const response = await fs.promises.readFile(path, 'utf8')
        return JSON.parse(response)
    } catch (e) {
        console.log(e)
        return false
    }
}
const updateFile = async (path, file) => {
    try {
        await fs.promises.writeFile(path, JSON.stringify(file))
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}
function generateRandomId(count) {
    let result = ''
    let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
    for (let i = 0; i < count; ++i) {
        let position = Math.floor(Math.random() * words.length - 1)
        result += words.substring(position, position + 1);
    }
    return result;
}
function transliterate(value) {
    const translate = {
        а: 'a',
        б: 'b',
        в: 'v',
        г: 'g',
        д: 'd',
        е: 'e',
        ё: 'e',
        ж: 'zh',
        з: 'z',
        и: 'i',
        й: 'j',
        к: 'k',
        л: 'l',
        м: 'm',
        н: 'n',
        о: 'o',
        п: 'p',
        р: 'r',
        с: 's',
        т: 't',
        у: 'u',
        ф: 'f',
        х: 'h',
        ц: 'c',
        ч: 'ch',
        ш: 'sh',
        щ: 'sh',
        ы: 'y',
        э: 'e',
        ю: 'yu',
        я: 'ya'
    }

    let translateValue = '';
    let array = value.toLowerCase().split('')
    if (value) {
        array.forEach(item => {
            for (let key in translate) {
                if (item === ' ' || item === '-') {
                    translateValue += '-'
                    return
                }
                else if (key === item) {
                    translateValue += translate[key]
                    return
                }
            }
        })
    }
    return translateValue
}



module.exports.all = async (req, res) => {
    try {
        const {page, limit, sort, sortDirection} = req.query

        const from = Boolean(+page) ? Number(page-1) * Number(limit) : 0
        const to = Number(from) + Number(limit)

        const items = await readFile(filePath)
        let data = []
        if(sort === 'date') {
            sortDirection === 'top' ?
                data = items.reverse().slice(from, to) :
                data = items.slice(from, to)
        }
        else {
            sortDirection === 'top' ?
                data = items.sort((a, b) => b.price - a.price).slice(from, to) :
                data = items.sort((a, b) => a.price - b.price).slice(from, to)
        }
        res.status(200).json({message: 'Товары получены', data, totalNumber: items.length,  isSuccess: true})
    }
    catch (e) {
        console.log(e)
        res.status(404).json({message: 'Товары не получены', isSuccess: false})
    }
}

module.exports.add = async (req, res) => {
    const date = new Date()
    try {
        const response = await readFile(filePath)
        const product = req.body
        product.id = generateRandomId(12)
        product.date_of_purchase = date.getTime()
        product.translate_title = transliterate(req.body.title)
        response.push(product)
        const updated = await updateFile(filePath, response)
        updated ?
            res.status(201).json({message: 'Продукт создан', data: product, isSuccess: true}) :
            res.status(404).json({message: 'Продукт не создан', isSuccess: false})
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Продукт не создан', isSuccess: false})
    }
}

module.exports.del = async (req, res) => {
    const id = req.params.id
        try {
            const response = await readFile(filePath)
            if (response) {
                let updatedFile = response.filter(item => String(item.id) !== String(id))
                const updated = await updateFile(filePath, updatedFile)
                updated ?
                    res.status(200).json({message: 'Продукт удален', isSuccess: true}) :
                    res.status(404).json({message: 'Продукт не удален', isSuccess: false})
            }
            else {
                res.status(404).json({message: 'Продукт не удален', isSuccess: false})
            }
        } catch (e) {
            console.log(e)
            res.status(404).json({message: 'Продукт не удален', isSuccess: false})
        }
}

module.exports.productById = async (req, res) => {
    try {
        const items = await readFile(filePath)
        const data = items.find(item => item.translate_title === req.params.id)
        res.status(200).json({message: 'Товары получены', data,  isSuccess: true})
    }
    catch (e) {
        res.status(404).json({message: 'Товар не получен', isSuccess: false})
    }
}

module.exports.update = async (req, res) => {
    const id = req.params.id
    try {
        const response = await readFile(filePath)
        if (response) {
            let updFile = response.find(item => String(item.id) === String(id))
            let index = response.findIndex(item => String(item.id) === String(id))
            updFile.title = req.body.title
            updFile.translate_title = transliterate(req.body.title)
            updFile.price = req.body.price
            updFile.description = req.body.description
            response.splice(index, 1, updFile)
            const updated = await updateFile(filePath, response)
            updated ?
                res.status(200).json({message: 'Продукт отредактирован', isSuccess: true}) :
                res.status(404).json({message: 'Продукт не отредактирован', isSuccess: false})
        }
        else {
            res.status(404).json({message: 'Продукт не отредактирован', isSuccess: false})
        }
    } catch (e) {
        console.log(e)
        res.status(404).json({message: 'Продукт не отредактирован', isSuccess: false})
    }
}
