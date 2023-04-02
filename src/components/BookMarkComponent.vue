<template>
    <div>
        <div class="head">
                <!-- 削除の動きはあとで作る -->
                <v-btn
                    size="small" color="error" class="global_css_haveIconButton_Margin"
                    :loading="$store.state.globalLoading"
                    :disabled="$store.state.globalLoading"
                >
                    <v-icon>mdi-trash-can</v-icon>
                    <p>{{messages.delete}}</p>
                </v-btn>
                <v-btn
                    size="small" color="#BBDEFB" class="global_css_haveIconButton_Margin"
                    :loading="$store.state.globalLoading"
                    :disabled="$store.state.globalLoading"
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
                :disabled="$store.state.globalLoading"
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
                :disabled="$store.state.globalLoading"
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
        },
        messages:{
            save:'save',
            delete:'delete',
            title:"title",
            url:"url [required]",
            otherError:"An error occurred on the server side, please wait a few seconds and try again",
        },
        bookMarkId    :this.originalBookMark.id,
        bookMarkTitle :this.originalBookMark.title,
        bookMarkUrl   :this.originalBookMark.url,

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
        originalBookMark:{
            type   :Object,
            default:() => ({
                id:null,
                title:'',
                url  :''
            })
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