import { createStore } from 'vuex'

export default createStore({
	state: {
        lang:"en",
        token:null,
	},
    getters:{},
	mutations: {
        setLang(state,lang){
            state.lang = lang
        },
        setToken(state,token){
            state.token = token
        },
    },
    actions: {
    },
    modules: {
    },
})
