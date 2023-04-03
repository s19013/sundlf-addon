<template>
    <div class="main">
        <BookMarkComponent
            ref="BookMarkComponent"
            @triggerSubmit="submit"
            :originalBookMark="{
                id:1,
                title:'test',
                url:'http://google.com'
            }"
        />
        <TagComponent
            ref="TagComponent"
            :originalCheckedTagList="[]"
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
            bookMarkUrl,
        })
        {
            this.$store.commit('switchGlobalLoading')
            // 新規登録
            if(bookMarkId == null){
                await axios.post('/api/bookmark/store',{
                    bookMarkTitle:bookMarkTitle,
                    bookMarkUrl  :bookMarkUrl,
                    tagList      :this.$refs.TagComponent.serveCheckedTagList(),
                    timezone     :Intl.DateTimeFormat().resolvedOptions().timeZone
                })
                .then((res)=>{console.log(res);})
                .catch((errors) => {this.$refs.BookMarkComponent.setErrors(errors.response)})
                .finally(()=> this.$store.commit('switchGlobalLoading',false))
            } else {
                await axios.put('/api/bookmark/update',{
                bookMarkId   :bookMarkId,
                bookMarkTitle:bookMarkTitle,
                bookMarkUrl  :bookMarkUrl,
                tagList      :this.$refs.TagComponent.serveCheckedTagList(),
                timezone     :Intl.DateTimeFormat().resolvedOptions().timeZone
            })
            .then((res)=>{console.log(res)})
            .catch((errors) => {this.$refs.BookMarkComponent.setErrors(errors.response)})
            .finally(()=> this.$store.commit('switchGlobalLoading',false))
            }
        },
    },
}
</script>