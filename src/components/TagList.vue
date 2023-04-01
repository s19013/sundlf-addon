<script setup>
import { ref, onMounted, onUnmounted,nextTick, reactive,defineEmits,defineProps } from 'vue';
const emits = defineEmits(["popTag"])
const props = defineProps({
    tagList:{
        type:Array,
        default: () => ([]) 
    },
    text:{
        type:String,
        default:"つけたタグ"
    },
})

const popTag = (i) => {
    emits('popTag',i)
}

</script>


<template>
    <div class="tagList">
        <p><v-icon>mdi-tag</v-icon>{{props.text}}</p>
        <ul >
            <li v-for="(tag, i) in props.tagList"
                :key="tag.name"
            >
                <v-chip
                    size="x-small"
                    closable
                    @click:close="popTag(i)"
                >
                    {{ tag.name }}
                </v-chip>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.tagList{
    ul{
        display: flex;
        flex-wrap: wrap;
    }
    li{
        list-style:none;
        margin:5px;
    }
}
p{font-size: small;}
</style>
