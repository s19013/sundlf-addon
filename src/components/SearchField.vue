<script setup>
import { ref, onMounted, onUnmounted,nextTick, reactive,defineEmits,defineProps } from 'vue';

let keyword = props.orignalKeyWord ? props.orignalKeyWord :""
const emits = defineEmits(['triggerSearch'])
const props = defineProps({
    orignalKeyWord:{
        type:String,
        default:""
    },
    searchLabel:{
        type:String,
        default:"検索"
    },
    loadingFlag:{
        type:Boolean,
        default:false,
    },
    lang:{
        type:String,
        default:"ja"
    }
})
const triggerSearch = () => {emits('triggerSearch')}
const serveKeywordToParent = () => {return keyword}
const resetKeyword = () => {keyword=""}

</script>

<template>
    <div class="searchField">
        {{ keyword }}
        <v-form v-on:submit.prevent ="triggerSearch()">
            <input 
                type="search" id="search" 
                v-model="keyword" placeholder="タグ名"
                :disabled = "loadingFlag"
            >
            <v-btn color="submit"
                size="small"
                class="global_css_haveIconButton_Margin"
                elevation="2"
                :loading = "loadingFlag"
                :disabled = "loadingFlag"
                @click.stop="triggerSearch()">
                <v-icon>mdi-magnify</v-icon>
                <p v-if="props.lang == 'ja'">検索</p>
                <p v-else>search</p>
            </v-btn>
        </v-form>
    </div>
</template>



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
