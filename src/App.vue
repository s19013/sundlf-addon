<template>
    <v-app>
        <Login v-if="!logined"/>
        <Main v-else/>

        <!-- ここにログアウトボタン -->
        <p class="logout" @click="logout()">{{ $store.getters.getLang == 'ja'? 'ログアウト':'Log out' }}</p>
    </v-app>
</template>

<script>
import Login from './Views/Login.vue'
import Main from './Views/Main.vue'

// Intl.DateTimeFormat().resolvedOptions().timeZone
// window.navigator.language

export default {
    data() {
        return {
            logined:false
        }
    },
    components: {
        Main,
        Login
    },
    methods: {
        logout(){
            // axios通信
            // トークン削除
            localStorage.removeItem('sundlfAddonToken')
            this.logined = false
        }
    },
    mounted() {
        if ((window.navigator.language).substring(0,2) == "ja") {this.$store.commit('setLang', "ja")}
        if (localStorage.getItem('sundlfAddonToken') != null) {
            this.logined = true
        }
        console.log(localStorage.getItem('sundlfAddonToken'));
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
