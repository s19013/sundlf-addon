import { createStore } from 'vuex'

export default createStore({
	state: {
        lang:"en",
        token:null,
        globalLoading:false,
	},
    getters:{},
	mutations: {
        setLang(state,lang){
            state.lang = lang
        },
        setToken(state,token){
            state.token = token
        },
        switchGlobalLoading(state){
            state.globalLoading = !state.globalLoading
        },
    },
    actions: {
    },
    modules: {
    },
})
