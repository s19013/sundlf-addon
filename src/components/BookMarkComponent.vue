<template>
    <div>
        <p>{{bookMarkId   }}</p>
        <p>{{bookMarkTitle}}</p>
        <p>{{bookMarkUrl  }}</p>
        <div class="head">
                <!-- 削除の動きはあとで作る -->
                <v-btn
                    size="small" color="error" class="global_css_haveIconButton_Margin"
                    :loading="$store.getters.getGlobalLoading"
                    :disabled="$store.getters.getGlobalLoading"
                >
                    <v-icon>mdi-trash-can</v-icon>
                    <p>{{messages.delete}}</p>
                </v-btn>
                <v-btn
                    size="small" color="#BBDEFB" class="global_css_haveIconButton_Margin"
                    :loading="$store.getters.getGlobalLoading"
                    :disabled="$store.getters.getGlobalLoading"
                    @click="submit()"
                >
                    <v-icon>mdi-content-save</v-icon>
                    <p>{{messages.save}}</p>
                </v-btn>
        </div>

        <p
            v-show="errorMessages.others.length>0"
            v-for ="message of errorMessages.others" :key="message"
            class ="global_css_error"
        >
            <v-icon>mdi-alert-circle-outline</v-icon>
            {{message}}
        </p>

        <p class="global_css_success" v-show="createdBookMarkFlag"> {{ messages.createdBookMark }}</p>
        <p class="global_css_success" v-show="updatedBookMarkFlag"> {{ messages.updatedBookMark }}</p>

        <v-form @submit.prevent>
            <!-- タイトル入力欄とボタン2つ -->
            <p
                v-show="errorMessages.bookMarkTitle.length>0"
                v-for ="message of errorMessages.bookMarkTitle" :key="message"
                class ="global_css_error"
            >
                <v-icon>mdi-alert-circle-outline</v-icon>
                {{message}}
            </p>

            <input
                type="text"
                class="global_css_input"
                v-model="bookMarkTitle"
                :placeholder="messages.title"
                :disabled="$store.getters.getGlobalLoading"
                @keydown.enter.exact="this.$refs.url.focus()"
            />

            <p
                v-show="errorMessages.bookMarkUrl.length>0"
                v-for ="message of errorMessages.bookMarkUrl" :key="message"
                class ="global_css_error"
            >
                <v-icon>mdi-alert-circle-outline</v-icon>
                {{message}}
            </p>

            <input
                type="url"
                class="global_css_input"
                v-model = "bookMarkUrl"
                :placeholder="messages.url"
                :disabled="$store.getters.getGlobalLoading"
                @keydown.enter.exact="this.submit()"
            >
        </v-form>
    </div>
</template>

<script>

export default {
    data() {
      return {
        japanese:{
            save:'保存',
            delete:'削除',
            title:"タイトル",
            url:"url [必須]",
            otherError:"サーバー側でエラーが発生しました｡数秒待って再度送信してください",
            createdBookMark:"ブックマークを作成しました",
            updatedBookMark:"ブックマークを更新しました",
        },
        messages:{
            save:'save',
            delete:'delete',
            title:"title",
            url:"url [required]",
            otherError:"An error occurred on the server side, please wait a few seconds and try again",
            createdBookMark:"created bookmark",
            updatedBookMark:"updated bookmark",
        },
        bookMarkId    :null,
        bookMarkTitle :null,
        bookMarkUrl   :null,

        createdBookMarkFlag:false,
        updatedBookMarkFlag:false,

        // 初期の読み込みで空配列などが無いとエラーを吐かれる
        errorMessages:{
            others:[],//サーバー側のエラー
            bookMarkTitle:[],
            bookMarkUrl:[],
        },
      }
    },
    components:{
        
    },
    emits: ['triggerSubmit','triggerDeleteBookMark'],
    props:{
        title:{
            type   :String,
            default:''
        },
        pageTitle:{
            type   :String,
            default:''
        },
    },
    methods: {
        // 本文送信
        submit(){
            this.$emit('triggerSubmit',{
                bookMarkId   :this.bookMarkId,
                bookMarkTitle:this.bookMarkTitle,
                bookMarkUrl  :this.bookMarkUrl,
            })
        },
        async getBookmarkId(){
            // 新規追加した時に更新用にidをとって来ないと行けない
            await axios.post('bookmark/id',{
                bookMarkUrl  :this.bookMarkUrl,
            })
            .then((res) => {
                console.log(res);
                this.bookMarkId = res.data.bookMarkId
            })
            .catch(() => {})
        },
        deleteBookMark() {this.$emit('triggerDeleteBookMark')},
        // エラーを配置
        setErrors(errors){
            console.log(errors);
            if (String(errors.status)[0] == 5) {
                this.errorMessages = {
                    "others" : [this.messages.otherError]
                }
            }
            else { this.errorMessages = errors.data.messages }
        },
        // 親から値を受け取る
        setBookMark(bookMark){
            this.bookMarkId = bookMark.id
            this.bookMarkTitle = bookMark.title
            this.bookMarkUrl = bookMark.url
        },
        showCreatedBookMarkMessage(){
            this.createdBookMarkFlag = true
            setTimeout(()=>{this.createdBookMarkFlag = false}, 3000);
        },
        showUpdatedBookMarkMessage(){
            this.updatedBookMarkFlag = true
            setTimeout(()=>{this.updatedBookMarkFlag = false}, 3000);
        },
    },
    mounted() {
        this.$nextTick(function () {
            if (this.$store.state.lang == "ja"){this.messages = this.japanese}
        })
    },
}
</script>

<style scoped lang="scss">
.head{
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-bottom: 1rem;
}
.v-form{
    display: flex;
    flex-flow: column;
    gap: 1rem;
}
</style>