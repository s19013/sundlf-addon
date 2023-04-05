import { createStore } from 'vuex'

export default createStore({
	state: {
        lang:"en",
        globalLoading:false,
        cookie:"",
	},
    getters:{
        getLang(state){return state.lang},
        getGlobalLoading(state){return state.globalLoading},
        getCookie(state){return state.cookie}
    },
	mutations: {
        setLang(state,lang){state.lang = lang},
        switchGlobalLoading(state,status=null){
            if (status == null) {state.globalLoading = !state.globalLoading}
            else {state.globalLoading = status}
        },
        setCookie(state,cookie){
            state.cookie = cookie
        }
    },
    actions: {

    },
    modules: {
    },
})
