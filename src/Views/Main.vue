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
            bookMarkUrl,
        })
        {
            this.$store.commit('switchGlobalLoading')
            // 新規登録
            if(bookMarkId == null){
                console.log(bookMarkId,bookMarkTitle,bookMarkUrl);
                console.log(this.$refs.TagComponent.serveCheckedTagList());
                await axios.post('/api/bookmark/store',{
                    bookMarkTitle:bookMarkTitle,
                    bookMarkUrl  :bookMarkUrl,
                    tagList      :this.$refs.TagComponent.serveCheckedTagList(),
                    timezone     :Intl.DateTimeFormat().resolvedOptions().timeZone
                })
                .then((res)=>{console.log(res);})
                .catch((errors) => {this.$refs.BookMarkComponent.setErrors(errors.response)})
                .finally(()=> this.$store.commit('switchGlobalLoading'))
            } else {
                console.log(bookMarkId,bookMarkTitle,bookMarkUrl);
                console.log(this.$refs.TagComponent.serveCheckedTagList());
                await axios.put('/api/bookmark/update',{
                bookMarkId   :bookMarkId,
                bookMarkTitle:bookMarkTitle,
                bookMarkUrl  :bookMarkUrl,
                tagList      :this.$refs.TagComponent.serveCheckedTagList(),
                timezone     :Intl.DateTimeFormat().resolvedOptions().timeZone
            })
            .then((res)=>{console.log(res)})
            .catch((errors) => {this.$refs.BookMarkComponent.setErrors(errors.response)})
            .finally(()=> this.$store.commit('switchGlobalLoading'))
            }
        },
    },
}
</script>