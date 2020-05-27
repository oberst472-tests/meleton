import customFetch from './fetch'

const baseUrl = process.env.NODE_ENV === 'development' ? `http://localhost:3000` : `http://localhost:3000`

//искусственная задержка
function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const apiGetProductById = async function(id) {
    await timeout(1000)
    const [data] = await Promise.all([customFetch('get', `${baseUrl}/api/products/${id}`)])
    return data
}

export const apiGetAll = async function({page, limit}) {
    await timeout(1000)
    const [data] = await Promise.all([customFetch('get', `${baseUrl}/api/products/?page=${page}&limit=${limit}`)])
    return data
}

export const apiAddNewProduct = async function(form) {
    await timeout(1000)
    const [data] = await Promise.all([customFetch('post', `${baseUrl}/api/products/`, form)])
    return data
}

export const apiDeleteProduct = async function(id) {
    await timeout(1000)
    const [data] = await Promise.all([customFetch('delete', `${baseUrl}/api/products/${id}`)])
    return data
}

export const apiUpdateProduct = async function(form) {
    await timeout(1000)
    const [data] = await Promise.all([customFetch('patch', `${baseUrl}/api/products/${form.id}`, form)])
    return data
}
