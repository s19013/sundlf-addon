<template>
    <div class="main">
        <p>{{ errors }}</p>
        <P v-show="deleted">{{ $store.getters.getLang == 'ja'? '削除しました':'deleted' }}</P>
        <BookMarkComponent
            ref="BookMarkComponent"
            @triggerSubmit="submit"
            @triggerDeleteBookMark = "deleteBookMark"
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
            errors:null,
            deleted:false,
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
            this.deleted = false
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
        async deleteBookMark(bookMarkId){
            this.$store.commit('switchGlobalLoading')
            await axios.delete('bookmark/' + bookMarkId)
            .then(() => {
                this.deleted = true
                // 色々リセットさせる
                this.$refs.BookMarkComponent.resetBookMark()
                this.$ress.TagComponent.clearAllCheck()
            })
            .catch((errors) => {
                // とりまエラー表示させる
                console.log(errors);
                this.errors = errors.messages
            })
            .finally(()=> this.$store.commit('switchGlobalLoading',false))

        },
        async isThisBookMarkAllreadyExists(){
            let [thisTab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
            this.$store.commit('switchGlobalLoading')
            await axios.post('bookmark/data',{
                bookMarkUrl  :thisTab.url,
            })
            .then((res)=>{
                console.log(res.data);
                this.$refs.BookMarkComponent.setBookMark(res.data.bookmark)
                this.$refs.TagComponent.setCheckedTagList(res.data.checkedTagList)
            })
            .catch((errors) => {
                // 現在のタイトルとurlを設置
                let thisBookmark = {
                    id   :null,
                    title:thisTab.title,
                    url  :thisTab.url
                }
                this.$refs.BookMarkComponent.setBookMark(thisBookmark)
            })
            .finally(()=> {
                setTimeout(()=>{this.$store.commit('switchGlobalLoading',false)}, 500);
            })
        },
    },
    beforeMount(){
        this.isThisBookMarkAllreadyExists()
    },
}
</script>