import { createStore } from 'vuex'

export default createStore({
	state: {
        lang:"en",
        token:localStorage.getItem('sundlfAddonToken'),
        globalLoading:false,
	},
    getters:{
        getLang(state){return state.lang},
        getToken(state){return state.token},
        getGlobalLoading(state){return state.globalLoading},
    },
	mutations: {
        setLang(state,lang){
            state.lang = lang
        },
        setToken(state,token){
            state.token = token
            localStorage.setItem('sundlfAddonToken', token);
        },
        switchGlobalLoading(state){
            state.globalLoading = !state.globalLoading
        },
        deleteToken(state){
            state.token = null
            localStorage.removeItem('sundlfAddonToken');
        }
    },
    actions: {
    },
    modules: {
    },
})
