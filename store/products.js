import {apiGetAll, apiAddNewProduct, apiDeleteProduct, apiGetProductById, apiUpdateProduct} from '~/api/api'
export const state = () => ({
    items: [],
    product: null,
    totalNumber: 0, //общее колличество товаров
    isFormActive: false
})

export const mutations = {
    addItems(state, payload) {
        state.items = payload
    },
    addTotalNumber(state, payload) {
        payload ? state.totalNumber = payload : state.totalNumber = state.totalNumber++
    },
    setFormActive(state, payload) {
        state.isFormActive = payload
    },
    addNewProduct(state, payload) {
        state.items.push(payload)
    },
    setProduct(state, payload) {
        state.product = payload
    }

}

export const actions = {
    async stAddItems({commit}, query = {page: 1, limit: 2}) {
        try {
            const data = await apiGetAll(query)
            commit('addItems', data.data)
            commit('addTotalNumber', data.totalNumber)
            return data
        } catch (e) {
            console.log(e)
        }
    },
    async stGetProductById({commit}, id) {
        try {
            const data = await apiGetProductById(id)
            commit('setProduct', data.data)
            return data
        } catch (e) {
            console.log(e)
        }
    },
    async stAddNewProduct({commit}, form) {
        try {
            const data = await apiAddNewProduct(form)
            commit('addNewProduct', data.data)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    },
    async stDeleteProduct({commit, dispatch}, id) {
        try {
            await apiDeleteProduct(id)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    },
    async stUpdateProduct({commit, dispatch}, form) {
        console.log(form)
        try {
            await apiUpdateProduct(form)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    },
    changeFormActive({commit}, payload) {
        commit('setFormActive', payload)
    }
}
