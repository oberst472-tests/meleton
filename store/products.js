export const state = () => ({
    items: []
})

export const mutations = {
    addItems(state, payload) {
        state.items = payload
        console.log(state.items)
    },
}

export const actions = {
    stAddItems({commit}, payload) {
        commit('addItems', payload)
    }
}
