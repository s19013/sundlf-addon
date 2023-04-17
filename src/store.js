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
        setLang(state,lang){state.lang = lang},
        switchGlobalLoading(state,status=null){
            if (status == null) {state.globalLoading = !state.globalLoading}
            else {state.globalLoading = status}
        },
    },
    actions: {

    },
    modules: {
    },
})
