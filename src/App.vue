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
            isLogined:false
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
        async logout(){
            this.$store.commit('switchGlobalLoading')
            await axios
                .get('logout')
                .then((res) => {
                    this.removeToken()
                    // localStorage.removeItem('sundlfAddonToken')

                    this.isLogined=false
                })
                .catch((err) => {console.log(err)})
                .finally(()=> this.$store.commit('switchGlobalLoading',false))
        },
        async logined(){
            this.isLogined=true
            // トークンをheaderにつける
            await chrome.storage.local.get(["sundlfAddonToken"]).then((localStrageObject) => {
                axios.defaults.headers.common['Authorization'] = localStrageObject.sundlfAddonToken
            })
        },
        async chechkLogined(){
            await chrome.storage.local.get(["sundlfAddonToken"]).then((localStrageObject) => {
                if (localStrageObject.sundlfAddonToken != null) {
                    this.logined = true
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
