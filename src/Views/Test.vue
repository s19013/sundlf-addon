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
            await chrome.storage.local.get("testToken").then((localStrageObject) => {
                this.chromeData = localStrageObject.testToken
                console.dir(localStrageObject);
                // console.log("Value currently is " + localStrageObject);
            });
        },
        async deleteToken(){
            await chrome.storage.local.remove("testToken").then(()=>{
                console.log('removed');
            });
        },
        async checkIsTokenSeted(){
            await chrome.storage.local.get(["testToken"])
            .then((localStrageObject) => {
                console.log("called");
                console.log(localStrageObject.testToken);
                if (localStrageObject.testToken != null) {
                    console.log("token seted");
                }
            })
            .catch((error) => {console.log(error);})
        },
    },
    mounted() {
        this.checkIsTokenSeted()
    },
}
</script>