<template>
    <div class="main">
        <BookMarkComponent
            ref="BookMarkComponent"
            @triggerSubmit="submit"
        />
        <TagComponent
            ref="TagComponent"
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
                await axios.post('bookmark/store',{
                    bookMarkTitle:bookMarkTitle,
                    bookMarkUrl  :bookMarkUrl,
                    tagList      :this.$refs.TagComponent.serveCheckedTagList(),
                    timezone     :Intl.DateTimeFormat().resolvedOptions().timeZone
                })
                .then(()=>{
                    this.$refs.BookMarkComponent.getBookmarkId()
                    this.$refs.BookMarkComponent.showCreatedBookMarkMessage()
                })
                .catch((errors) => {this.$refs.BookMarkComponent.setErrors(errors.response)})
                .finally(()=> this.$store.commit('switchGlobalLoading',false))
            } else {
                await axios.put('bookmark/update',{
                bookMarkId   :bookMarkId,
                bookMarkTitle:bookMarkTitle,
                bookMarkUrl  :bookMarkUrl,
                tagList      :this.$refs.TagComponent.serveCheckedTagList(),
                timezone     :Intl.DateTimeFormat().resolvedOptions().timeZone
            })
            .then(()=>{this.$refs.BookMarkComponent.showUpdatedBookMarkMessage()})
            .catch((errors) => {this.$refs.BookMarkComponent.setErrors(errors.response)})
            .finally(()=> this.$store.commit('switchGlobalLoading',false))
            }
        },
        async isThisBookMarkAllreadyExists(url){
            // とりあえず今は適当なブクマ取ってきて実験して見る
            this.$store.commit('switchGlobalLoading')
            await axios.post('bookmark/data',{
                bookMarkUrl  :url,
            })
            .then((res)=>{
                // propsに設置
                console.log(res.data);
                this.$refs.BookMarkComponent.setBookMark(res.data.bookmark)
                this.$refs.TagComponent.setCheckedTagList(res.data.checkedTagList)
            })
            .catch((errors) => {})
            .finally(()=> {
                setTimeout(()=>{this.$store.commit('switchGlobalLoading',false)}, 500);
            })
        }
    },
    beforeMount(){
        this.isThisBookMarkAllreadyExists('https://twitter.com')
    },
}
</script>