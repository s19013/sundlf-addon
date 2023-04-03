<template>
    <div class="searchField">
        <v-form v-on:submit.prevent ="triggerSearch()">
            <input 
                type="search"
                v-model="keyword" :placeholder="$store.getters.getLang == 'ja'? '検索するタグ':'search tag'"
                :disabled = "$store.getters.getGlobalLoading"
            >
            <v-btn color="submit"
                class="global_css_haveIconButton_Margin"
                elevation="2"
                size="small"
                :disabled = "$store.getters.getGlobalLoading"
                @click.stop="triggerSearch()">
                <v-icon>mdi-magnify</v-icon>
                <p v-if="$store.getters.getLang == 'ja'">検索</p>
                <p v-else>search</p>
            </v-btn>
        </v-form>
    </div>
</template>

<script>
export default{
    data() {
        return {
            // propsのoriginalKeyWordがnullの時は ""
            keyword:this.orignalKeyWord ? this.orignalKeyWord :""
        }
    },
    props:{
        orignalKeyWord:{
            type:String,
            default:""
        },
    },
    methods: {
        triggerSearch(){this.$emit('triggerSearch')},
        serveKeywordToParent(){return this.keyword},
        resetKeyword(){this.keyword=""}
    },
}

</script>



<style scoped lang="scss">
form{
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
    gap:1rem;
    input{
        flex:9;
        outline:black solid 1px;
        padding: 0.2rem;
        font-size: small;
    }
    .v-btn  {flex:1;}
}
</style>
