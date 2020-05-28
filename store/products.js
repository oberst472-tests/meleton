import {apiGetAll, apiAddNewProduct, apiDeleteProduct, apiGetProductById, apiUpdateProduct} from '~/api/api'
export const state = () => ({
    items: [], //продукты
    product: null, //детальная инфо о продукте
    totalNumber: 0, //общее колличество товаров
    isFormActive: false,
    sort: 'date',
    sortDirection: 'top'
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
    },
    setSort(state, payload) {
        state.sort = payload
        state.sortDirection === 'top' ? state.sortDirection = 'bottom' : state.sortDirection = 'top'
    }
}

export const actions = {
    async stAddItems({state, commit}, query = {page: 1}) {
        query.limit = 2
        query.sort = state.sort
        query.sortDirection = state.sortDirection
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
    sortPrice({commit, dispatch}) {
        commit('setSort', 'price')
        dispatch('stAddItems')
    },
    sortDate({commit, dispatch}) {
        commit('setSort', 'date')
        dispatch('stAddItems')
    },
    changeFormActive({commit}, payload) {
        commit('setFormActive', payload)
    }
}
