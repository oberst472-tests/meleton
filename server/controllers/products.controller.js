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


module.exports.all = async (req, res) => {
    const {from, limit} = req.query
    const to = Number(from) + Number(limit)
    const items = await readFile(filePath)
    const data = items.slice(from, to)
    res.status(200).json({message: 'Товары получены', data, totalNumber: items.length,  isSuccess: true})
}
