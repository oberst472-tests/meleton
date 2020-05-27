import {apiGetAll, apiAddNewProduct} from '~/api/api'
export const state = () => ({
    items: [],
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
    }

}

export const actions = {
    async stAddItems({commit}, query) {
        try {
            const data = await apiGetAll(query)
            commit('addItems', data.data)
            commit('addTotalNumber', data.totalNumber)
            return data
        } catch (e) {
            console.log(e)
        }
    },
    async stAddNewProduct({commit}, form) {
        try {
            const data = await apiAddNewProduct(form)
            console.log(data)
            commit('addNewProduct', data.data)
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
