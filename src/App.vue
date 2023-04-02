<template>
    <v-app>
        <Main/>
    </v-app>
</template>

<script>
import Main from './Views/Main.vue'

// Intl.DateTimeFormat().resolvedOptions().timeZone
// window.navigator.language

export default {
    data() {
        return {
            lang: 'ja',
            
        }
    },
    components: {
        Main
    },
    methods: {
        
    },
    mounted() {
        if ((window.navigator.language).substring(0,2) == "ja") {this.$store.state.lang = "ja"}
    }
}
</script>

<style scoped lang="scss">

</style>
