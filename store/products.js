import {apiGetAll} from '~/api/api'
export const state = () => ({
    items: [],
    totalNumber: 0 //общее колличество товаров
})

export const mutations = {
    addItems(state, payload) {
        state.items = payload
    },
    addTotalNumber(state, payload) {
        state.totalNumber = payload
        console.log(state.totalNumber)
    },

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
    }
}
