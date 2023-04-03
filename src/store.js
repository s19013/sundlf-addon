import { createStore } from 'vuex'

export default createStore({
	state: {
        lang:"en",
        globalLoading:false,
        isLogined:false,
	},
    getters:{
        getLang(state){return state.lang},
        getIsLogined(state){return state.isLogined},
        getGlobalLoading(state){return state.globalLoading},
    },
	mutations: {
        setLang(state,lang){state.lang = lang},
        setIsLogined(state,status){state.isLogined = status},
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
