export const state = () => ({
    messages: []
})

export const mutations = {
    addItemIncrement(state, item) {
        state.messages.push({ status: item[0], value: item[1] })
    },
    addItemDecrement(state) {
        state.messages.splice(0, 1)
    }
}

export const actions = {
    message({ commit }, item) {
        commit('addItemIncrement', item)
    },
    deleteMessage({ commit }) {
        commit('addItemDecrement')
    }
}
