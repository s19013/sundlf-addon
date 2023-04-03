<template>
    <div>
        <SearchField
            ref="SearchField"
            :lang="$store.getters.getLang"
            @triggerSearch="searchBranch"
        />
        <TagList
            :tagList="checkedTagList"
            :lang="$store.getters.getLang"
            @popTag="popTag"
        />
        

        <!-- 読み込みアニメ -->
        <v-progress-circular
            :size=100
            color="primary"
            v-show="$store.getters.getGlobalLoading == true"
            indeterminate
        ></v-progress-circular>

        <!-- タグ一覧 -->
        <ul
            width="100%"
            max-height="1vh"
        >
            <li v-for="tag of tagSearchResultList" :key="tag.id">
                <input
                    class="global_css_input"
                    type="checkbox"
                    v-model="checkedTagList"
                    :id="tag.id"
                    :value="{ id: tag.id, name: tag.name }"
                    :disabled="$store.getters.getGlobalLoading"
                />
                <label :for="tag.id">{{ tag.name }}</label>
            </li>
        </ul>

        <!-- 新規タグ作成 -->
        <div class="areaCreateNewTag">
            <p
                v-show="errorMessages.name.length>0"
                v-for ="message of errorMessages.name" :key="message"
                class ="global_css_error"
            >
                <v-icon>mdi-alert-circle-outline</v-icon>
                {{message}}
            </p>

            <v-form v-on:submit.prevent ="createNewTag">
                <input
                    class="global_css_input"
                    type="text"
                    v-model="newTag"
                    :disabled="$store.getters.getGlobalLoading"
                    :placeholder="messages.tagName"
                >
                <v-btn
                    class="global_css_haveIconButton_Margin"
                    color="#BBDEFB"
                    size="small"
                    elevation="2"
                    :disabled="$store.getters.getGlobalLoading"
                    :loading ="$store.getters.getGlobalLoading"
                    @click.stop="createNewTag()">
                    <v-icon>mdi-content-save</v-icon>
                    <p>{{ messages.create }}</p>
                </v-btn>
            </v-form>
        </div>
    </div>
</template>

<script>
import SearchField from '@/components/SearchField.vue'
import TagList from '@/components/TagList.vue'
import MakeListTools from '@/tools/MakeListTools.js'
import { sortArrayByName } from '@/tools/SortOption.js'

const makeListTools = new MakeListTools()

// Intl.DateTimeFormat().resolvedOptions().timeZone
// window.navigator.language

export default {
    data() {
        return {
            japanese: {
                tag: 'タグ',
                close: '閉じる',
                search: 'タグ検索',
                checked: 'チェックを付けたタグだけを表示',
                uncheck: 'チェックをすべてはずす',
                make: '新規作成',
                tagName: 'タグ名',
                create: '作成'
            },
            messages: {
                tag: 'tag',
                close: 'close',
                search: 'Tag search',
                checked: 'Show only checked tags',
                uncheck: 'uncheck all',
                make: 'Create New',
                tagName: 'tag name',
                create: 'create'
            },
            newTag: '',

            // flag
            onlyCheckedFlag: false,
            createNewTagFlag: false,
            tagDialogFlag: false,
            isFirstSearchFlag: true,

            //loding
            disableFlag: false,

            // errorFlag
            errorMessages: { name: [] },

            // tagList
            checkedTagList: [],
            // tagSearchResultList: [{id:1,name:"aaa"},{id:2,name:"bbb"},{id:3,name:"ccc"},{id:4,name:"ddd"},{id:5,name:"eee"},{id:6,name:"fff"},{id:7,name:"ggg"},{id:8,name:"hhh"}],
            tagSearchResultList: [],
            tagCacheList: [], //全件検索のキャッシュ
            allTagCacheList: [] //全件検索のキャッシュ
        }
    },
    props:{
        originalCheckedTagList:{
            //更新や閲覧画面で既にチェックがついているタグを受け取るため
            type   :Array,
            default:() => ([]),
        },
    },
    components: {
        SearchField,
        TagList
    },
    methods: {
        // 新規タグ作成
        async createNewTag() {
            this.$store.commit('switchGlobalLoading')
            await axios
                .post('/api/tag/store', { name: this.newTag })
                .then((res) => {
                    //検索欄をリセット
                    this.$refs.SearchField.resetKeyword()
                    this.resetError()

                    // 読み込み直し
                    this.isFirstSearchFlag = true
                    this.searchAllTag()

                    // 入力欄を消す
                    this.createNewTagFlag = false
                    this.newTag = null
                })
                .catch((errors) => {this.errorMessages = errors.response.data.messages})
                .finally(()=> this.$store.commit('switchGlobalLoading',false))
        },
        // タグ検索
        searchBranch() {
            if (this.$refs.SearchField.serveKeywordToParent() == '') {
                //初期ローディング以外の全件検索だったらキャッシュを使う
                if (this.isFirstSearchFlag == false) {
                    this.tagSearchResultList = this.allTagCacheList
                    this.tagCacheList = this.allTagCacheList
                }
                // 初期ローディング､更新後の全件検索
                else {this.searchAllTag()}
            }
            // 他の検索
            else {this.searchTag()}
        },
        // 全件検索
        async searchAllTag() {
            //ローディングアニメ開始
            this.$store.commit('switchGlobalLoading')

            //既存チェックボックスのチェックを外す
            this.onlyCheckedFlag = false

            //配列,キャッシュ初期化
            this.tagSearchResultList = []
            this.tagCacheList = [] //キャッシュをクリアするのは既存チェックボックスを外す時に出てくるバグを防ぐため

            await axios
                .post('/api/tag/search', { keyword: '' })
                .then((res) => {
                    for (const tag of res.data) {
                        this.tagSearchResultList.push({
                            id: tag.id,
                            name: tag.name
                        })
                    }
                    //キャッシュにコピー
                    this.allTagCacheList = [...this.tagSearchResultList]
                    this.tagCacheList = [...this.tagSearchResultList]
                })
                .catch((err) => {console.log(err)})
                .finally(()=> this.$store.commit('switchGlobalLoading',false))

            //初期ローディングフラグを切る
            this.isFirstSearchFlag = false
        },
        // タグ検索
        async searchTag() {
            //ローディングアニメ開始
            this.$store.commit('switchGlobalLoading')

            //既存チェックボックスのチェックを外す
            this.onlyCheckedFlag = false

            //配列,キャッシュ初期化
            this.tagSearchResultList = []
            this.tagCacheList = [] //キャッシュをクリアするのは既存チェックボックスを外す時に出てくるバグを防ぐため
            await axios
                .post('/api/tag/search', { keyword: this.$refs.SearchField.serveKeywordToParent() })
                .then((res) => {
                    for (const tag of res.data) {
                        this.tagSearchResultList.push({
                            id: tag.id,
                            name: tag.name
                        })
                    }
                    //キャッシュにコピー
                    this.tagCacheList = [...this.tagSearchResultList]
                })
                .catch((err) => {console.log(err)})
                .finally(()=> this.$store.commit('switchGlobalLoading',false))
        },
        // タグ削除
        popTag(i) {this.checkedTagList.splice(i, 1)},
        clearAllCheck() {this.checkedTagList = []},
        resetError() {this.errorMessages = { name: [] }},
        //親にチェックリストを渡す
        serveCheckedTagList(){return makeListTools.tagIdList(this.checkedTagList)},
    },
    watch:{
        checkedTagList:function(){
            this.checkedTagList = this.checkedTagList.sort(sortArrayByName)
        }
    },
    mounted() {
        this.$nextTick(function () {
            if (this.$store.getters.getLang == "ja"){this.messages = this.japanese}
        })

        //originalCheckedTagListの中が完全に空ではなかったら代入
        if (this.originalCheckedTagList.length != 0 ) {
            const originalCheckedTagListLength = this.originalCheckedTagList.length //forで毎度計算されるのを防ぐ
            // idがnullのデータ(ユーザーがget通信でurlを変にいじったら起きる)の時の処理
            let originalCheckedTagList_copy = this.originalCheckedTagList
            for (let index = 0; index < originalCheckedTagListLength; index++) {
                if(this.originalCheckedTagList[index].id == null){originalCheckedTagList_copy.splice(index) }
            }

            this.checkedTagList = originalCheckedTagList_copy
        }

        this.searchAllTag()
    }
}
</script>

<style scoped lang="scss">
ul{
    overflow-y: auto;
    max-height: 50vh;
    outline:black solid 1px;
    padding:0.5rem;
    li{display: block;}
    label {
        margin-left: 0.5rem;
        width: 100%;
    }
}
.v-progress-circular {
    margin: auto;
}
.areaCreateNewTag {
    margin: 1rem 0 0.5rem 0;
    .v-form{
        display: flex;
        gap:1rem;
        input{
            flex: 9;
        }
        button {flex:1}
    }
}
</style>