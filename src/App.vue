<script setup>
import { ref, onMounted, onUnmounted,nextTick, reactive } from 'vue';
import SearchField from './components/SearchField.vue';
import TagList from './components/TagList.vue';

let lang = "ja"

let messages = reactive({
  text: "hello"
})

// Intl.DateTimeFormat().resolvedOptions().timeZone
// window.navigator.language

onMounted(() => {
  lang = (window.navigator.language).substring(0,2)
})
</script>

<template>
  <v-app>
    <SearchField :lang="lang"/>
    <TagList 
      :lang="lang"
      :tag-list="[{id:1,name:'aaa'},{id:2,name:'bbb'},{id:3,name:'ccc'}]"
    />
  </v-app>
</template>

<style scoped>

</style>
