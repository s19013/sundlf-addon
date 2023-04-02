<template>
    <div class="main">
        <BookMarkComponent
            ref="bookmarkcomponent"
            @triggerSubmit="submit()"
        />
        <TagComponent
            ref="tagComponent"
            :originalCheckedTagList="[{id:1,name:'aaa'},{id:2,name:'bbb'},{id:3,name:'ccc'},{id:4,name:'ddd'},{id:5,name:'eee'},{id:6,name:'fff'},{id:7,name:'ggg'},{id:8,name:'hhh'}]"
        />

    </div>
</template>

<script>
import TagComponent from '@/components/TagComponent.vue'
import BookMarkComponent from '@/components/BookMarkComponent.vue'
export default {
    data() {
        return {
            
        }
    },
    components:{
        TagComponent,
        BookMarkComponent
    },
    methods: {
        async submit({
            bookMarkId,
            bookMarkTitle,
            bookMarkBody,
            tagList,
        })
        {
            // 新規登録
            if(bookMarkId == null){
                await axios.post('/api/bookMark/store',{
                    bookMarkTitle:bookMarkTitle,
                    bookMarkBody :bookMarkBody,
                    tagList     :this.$refs.tagComponent.serveCheckedTagList(),
                    timezone    :Intl.DateTimeFormat().resolvedOptions().timeZone
                })
                .then((res)=>{
                    console.log(res);
                    this.$store.commit('switchGlobalLoading')
                    this.$refs.BaseArticleLayout.switchSuccessed()
                    this.$refs.BaseArticleLayout.setArticleId(res.data.bookMarkId)
                })
                .catch((errors) => {
                    this.$store.commit('switchGlobalLoading')
                    this.$refs.BaseArticleLayout.setErrors(errors.response)
                })
            } else {
                await axios.put('/api/bookMark/update',{
                bookMarkId   :bookMarkId,
                bookMarkTitle:bookMarkTitle,
                bookMarkBody :bookMarkBody,
                tagList     :this.$refs.tagComponent.serveCheckedTagList(),
                timezone    :Intl.DateTimeFormat().resolvedOptions().timeZone
            })
            .then((res)=>{
                this.$store.commit('switchGlobalLoading')
                this.$refs.BaseArticleLayout.switchSuccessed()
            })
            .catch((errors) => {
                this.$store.commit('switchGlobalLoading')
                this.$refs.BaseArticleLayout.setErrors(errors.response)
            })
            }
        },
    },
}
</script>