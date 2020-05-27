import customFetch from './fetch'

const baseUrl = process.env.NODE_ENV === 'development' ? `http://localhost:3000` : `http://localhost:3000`

//искусственная задержка
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//получить все диалоги
export const apiGetAll = async function({from, limit}) {
    await timeout(1000)
    const [data] = await Promise.all([customFetch('get', `${baseUrl}/api/products/all?from=${from}&limit=${limit}`)])
    return data
}
