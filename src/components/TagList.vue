<template>
    <div class="tagList">
        <p v-if="lang == 'ja'"><v-icon>mdi-tag</v-icon>つけたタグ</p>
        <p v-else><v-icon>mdi-tag</v-icon>Attached Tag</p>
        <ul >
            <li v-for="(tag, i) in tagList"
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
