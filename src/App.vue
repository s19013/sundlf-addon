<script>
import SearchField from './components/SearchField.vue';
import TagList from './components/TagList.vue';
import MakeListTools from '@/tools/MakeListTools.js';
import {sortArrayByName} from '@/tools/SortOption.js';
const makeListTools =  new MakeListTools()

// Intl.DateTimeFormat().resolvedOptions().timeZone
// window.navigator.language

export default{
  data() {
    return {
      lang : "ja"
    }
  },
  components:{
    SearchField,
    TagList
  },
  mounted() {
    this.lang = (window.navigator.language).substring(0,2)
  },
}
</script>

<template>
  <v-app>
    <SearchField
      ref = "SearchField"
      :lang="lang"
    />
    <TagList
        :tagList="[{id:1,name:'aaa'},{id:2,name:'bbb'}]"
        :lang="lang"
    />
  </v-app>
</template>

<style scoped lang="scss">
label{
    margin-left:0.5rem;
    width:100%
}
.existCheckbox{
    label{font-size: 1.1rem;}
    margin:0.5rem 0;
}
.v-list{
    padding:0;
    .v-list-item{padding:0 0.5rem;}
}
.areaCreateNewTag{
    margin:1rem 0 0.5rem 0;
    button{margin-top: 0.8rem;}
}
</style>
