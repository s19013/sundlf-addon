<template>
    <div class="TagComponent">
        <TagList
            :tagList="checkedTagList"
            :lang="$store.getters.getLang"
            @popTag="popTag"
        />
        <SearchField
            ref="SearchField"
            :lang="$store.getters.getLang"
            @triggerSearch="searchBranch"
        />

        <!-- 読み込みアニメ -->
        <div class="divForProgressCircular">
            <v-progress-circular
                :size=100
                color="primary"
                v-show="$store.getters.getGlobalLoading == true || disableFlag == true"
                indeterminate
            ></v-progress-circular>
        </div>

        <!-- タグ一覧 -->
        <ul
            v-show="$store.getters.getGlobalLoading == false && disableFlag == false"
        >
            <li v-for="tag of tagSearchResultList" :key="tag.id">
                <input
                    class="global_css_input"
                    type="checkbox"
                    v-model="checkedTagList"
                    :id="tag.id"
                    :value="{ id: tag.id, name: tag.name }"
                    :disabled="$store.getters.getGlobalLoading || disableFlag == true"
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

            <p class="global_css_success" v-show="createdTagFlag">{{ messages.createdTag }}</p>

            <v-form v-on:submit.prevent ="createNewTag">
                <input
                    class="global_css_input"
                    type="text"
                    v-model="newTag"
                    :disabled="$store.getters.getGlobalLoading || disableFlag == true"
                    :placeholder="messages.tagName"
                >
                <v-btn
                    class="global_css_haveIconButton_Margin"
                    color="#BBDEFB"
                    size="small"
                    elevation="2"
                    :disabled="$store.getters.getGlobalLoading || disableFlag == true"
                    :loading ="$store.getters.getGlobalLoading || disableFlag == true"
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
                createdTag:"タグを作成しました",
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
                createdTag:"created tag",
                tagName: 'tag name',
                create: 'create'
            },
            newTag: '',

            // flag
            tagDialogFlag: false,
            isFirstSearchFlag: true,

            createdTagFlag:false,

            //loding
            disableFlag: false,

            // errorFlag
            errorMessages: { name: [] },

            // tagList
            checkedTagList: [],
            tagSearchResultList: [],
            tagCacheList: [], //全件検索のキャッシュ
            allTagCacheList: [] //全件検索のキャッシュ
        }
    },
    props:{
    },
    components: {
        SearchField,
        TagList
    },
    methods: {
        // 新規タグ作成
        async createNewTag() {
            this.disableFlag = true
            await axios
                .post('tag/store', { name: this.newTag })
                .then((res) => {
                    //検索欄をリセット
                    this.$refs.SearchField.resetKeyword()
                    this.resetError()

                    // 読み込み直し
                    this.isFirstSearchFlag = true
                    this.searchAllTag()

                    this.newTag = null

                    this.showCreatedTagMessage()
                })
                .catch((errors) => {this.errorMessages = errors.response.data.messages})
                .finally(()=> this.disableFlag = false)
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
            this.disableFlag = true

            //配列,キャッシュ初期化
            this.tagSearchResultList = []
            this.tagCacheList = [] //キャッシュをクリアするのは既存チェックボックスを外す時に出てくるバグを防ぐため

            await axios
                .post('tag/search', { keyword: '' })
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
                .finally(()=> this.disableFlag = false)
            //初期ローディングフラグを切る
            this.isFirstSearchFlag = false
        },
        // タグ検索
        async searchTag() {
            //ローディングアニメ開始
            this.disableFlag = true

            //配列,キャッシュ初期化
            this.tagSearchResultList = []
            this.tagCacheList = [] //キャッシュをクリアするのは既存チェックボックスを外す時に出てくるバグを防ぐため
            await axios
                .post('tag/search', { keyword: this.$refs.SearchField.serveKeywordToParent() })
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
                .finally(()=> this.disableFlag = false)
        },
        // タグ削除
        popTag(i) {this.checkedTagList.splice(i, 1)},
        clearAllCheck() {this.checkedTagList = []},
        resetError() {this.errorMessages = { name: [] }},
        //親にチェックリストを渡す
        serveCheckedTagList(){return makeListTools.tagIdList(this.checkedTagList)},
        showCreatedTagMessage(){
            this.createdTagFlag = true
            setTimeout(()=>{this.createdTagFlag = false}, 3000);
        },
        // 親から値を受け取る
        setCheckedTagList(list){this.checkedTagList = list},
    },
    watch:{
        checkedTagList:function(){
            this.checkedTagList = this.checkedTagList.sort(sortArrayByName)
        }
    },
    async mounted() {
        this.$nextTick(function () {
            if (this.$store.getters.getLang == "ja"){this.messages = this.japanese}
        })

        await setTimeout(() => {}, 100) // トークンが貼り付けられるまで少しまつ
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
.divForProgressCircular{
    text-align: center;
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