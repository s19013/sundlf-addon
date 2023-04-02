import { createStore } from 'vuex'

export default createStore({
	state: {
        lang:"en",
        globalLoading:false,
	},
    getters:{
        getLang(state){return state.lang},
        getGlobalLoading(state){return state.globalLoading},
    },
	mutations: {
        setLang(state,lang){
            state.lang = lang
        },
        setToken(state,token){
            localStorage.setItem('sundlfAddonToken', token);
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
