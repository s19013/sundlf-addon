<template>
    <div>
        {{ chromeData }}
        <v-btn @click="generate()">
            生成
        </v-btn>
        <v-btn @click="get()">
            取得
        </v-btn>
        <v-btn @click="deleteToken()">
            削除
        </v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            chromeData:'none'
        }
    },
    methods: {
        async generate(){
            await chrome.storage.local.set({ testToken : "genarated" }).then(() => {
                console.log("seted");
            });
        },
        async get(){
            await chrome.storage.local.get("testToken").then((result) => {
                this.chromeData = result.testToken
                console.dir(result);
                // console.log("Value currently is " + result);
            });
        },
        async deleteToken(){
            await chrome.storage.local.remove("testToken").then(()=>{
                console.log('removed');
            });
        }
    },
}
</script>