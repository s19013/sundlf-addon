<template>
    <div class="searchField">
        <v-form v-on:submit.prevent ="triggerSearch()">
            <input 
                type="search" id="search" 
                v-model="keyword" :placeholder="lang == 'ja'? 'タグ名':'tag'"
                :loading = "loadingFlag"
                :disabled = "loadingFlag"
            >
            <v-btn color="submit"
                class="global_css_haveIconButton_Margin"
                elevation="2"
                size="small"
                :loading  = "loadingFlag"
                :disabled = "loadingFlag"
                @click.stop="triggerSearch()">
                <v-icon>mdi-magnify</v-icon>
                <p v-if="lang == 'ja'">検索</p>
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
        loadingFlag:{
            type:Boolean,
            default:false,
        },
        lang:{
            type:String,
            default:"ja"
        }
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
    display:grid;
    grid-template-columns:5fr 1fr;
    margin-top: 10px;
    margin-bottom: 20px;
    gap:1rem;
    #search{
        outline:black solid 1px;
        grid-column: 1/2;
    }
    .v-btn  {
        grid-column: 2/3;
        width:90%;
    }
    input{
        padding: 0.2rem;
        font-size: small;
    }
}
</style>
