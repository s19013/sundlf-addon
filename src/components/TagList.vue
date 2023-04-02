<template>
    <div class="tagList">
        <p v-if="$store.getters.getLang == 'ja'"><v-icon>mdi-tag</v-icon>つけたタグ</p>
        <p v-else><v-icon>mdi-tag</v-icon>Attached Tag</p>
        <ul >
            <li v-for="(tag, i) in tagList"
                :key="tag.name"
            >
                <v-chip
                    size="x-small"
                    closable
                    :disabled="$store.getters.getGlobalLoading"
                    @click:close="popTag(i)"
                >
                    {{ tag.name }}
                </v-chip>
            </li>
        </ul>
    </div>
</template>

<script>
export default{
    data() {
      return {
      }
    },
    props:{
        tagList:{
            type:Array,
            default: () => ([])
        },
        lang:{
            type:String,
            default:"ja"
        }
    },
    methods: {
        popTag(i){this.$emit('popTag',i)}
    },
}
</script>

<style lang="scss" scoped>
.tagList{
    min-height: 3.5rem;
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
