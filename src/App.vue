<template>
    <v-app>
        <Login v-if="this.$store.getters.getIsLogined == false "/>
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
        }
    },
    components: {
        Main,
        Login
    },
    methods: {
        async logout(){
            this.$store.commit('switchGlobalLoading')
            // axios通信
            localStorage.removeItem('sundlfAddonToken')
            this.$store.commit('setIsLogined',false)
        }
    },
    mounted() {
        if ((window.navigator.language).substring(0,2) == "ja") {this.$store.commit('setLang', "ja")}
        if (localStorage.getItem('sundlfAddonToken') != null) {
            this.$store.commit('setIsLogined',true)
        }
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
