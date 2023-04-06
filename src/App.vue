<template>
    <v-app>
        <Login v-if="isLogined == false " @logined="logined"/>
        <Main v-else/>
        <!-- ここにログアウトボタン -->
        <p class="logout" @click="logout()">{{ $store.getters.getLang == 'ja'? 'ログアウト':'Log out' }}</p>
    </v-app>
</template>

<script>
import Login from './Views/Login.vue'
import Main from './Views/Main.vue'

export default {
    data() {
        return {
            isLogined:false,
            tokenTemp:null, // 外の変数にトークンを一旦貼り付けないとスコープとかの関係上難しい
        }
    },
    components: {
        Main,
        Login,
    },
    methods: {
        async removeToken(){
            await chrome.storage.local.remove('sundlfAddonToken', function() {console.log('removed');});
        },
        async PasteTokenIntoHeader(token){
            // スコープとかの関係上一旦外の関数でトークンをはらないと行けない
            axios.defaults.headers.common['Authorization'] = "Bearer " + token
            console.log(axios.defaults.headers.common['Authorization']);

            // どうしてもまってもらう
        },
        async logout(){
            this.$store.commit('switchGlobalLoading')
            this.removeToken()
            this.isLogined=false
            this.$store.commit('switchGlobalLoading',false)
        },
        async logined(){
            // トークンをheaderにつける
            await chrome.storage.local.get(["sundlfAddonToken"])
            .then((localStrageObject) => {
                this.PasteTokenIntoHeader(localStrageObject.sundlfAddonToken)
            })
            this.isLogined=true
        },
        async chechkLogined(){
            await chrome.storage.local.get(["sundlfAddonToken"]).then((localStrageObject) => {
                console.log(localStrageObject.sundlfAddonToken);
                if (localStrageObject.sundlfAddonToken != null) {
                    // トークンを持っていたら貼り付ける
                    this.PasteTokenIntoHeader(localStrageObject.sundlfAddonToken)
                    this.isLogined= true
                }
            })
        }
    },
    mounted() {
        if ((window.navigator.language).substring(0,2) == "ja") {this.$store.commit('setLang', "ja")}
        this.chechkLogined()
    }
}
</script>

<style scoped lang="scss">
.logout{
    margin-top: 2rem;
    color: blue;
    text-decoration:underline;
    cursor: pointer;
}
</style>
