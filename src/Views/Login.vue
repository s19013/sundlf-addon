<template>
    <div>
        <p
            v-if="errorMessages.other != null"
            class ="global_css_error"
        >
            <v-icon>mdi-alert-circle-outline</v-icon>
            {{errorMessages.other}}
        </p>
        <p
            v-show="errorMessages.email.length>0"
            v-for ="message of errorMessages.email" :key="message"
            class ="global_css_error"
        >
            <v-icon>mdi-alert-circle-outline</v-icon>
            {{message}}
        </p>
        <input 
            class="global_css_input"
            type="email" required
            v-model="email"
            :placeholder="$store.getters.getLang == 'ja'? 'メールアドレス':'email address'"
        >

        <p
            v-show="errorMessages.password.length>0"
            v-for ="message of errorMessages.password" :key="message"
            class ="global_css_error"
        >
            <v-icon>mdi-alert-circle-outline</v-icon>
            {{message}}
        </p>
        <input 
            class="global_css_input"
            type="password" required
            v-model="password"
            :placeholder="$store.getters.getLang == 'ja'? 'パスワード':'password'"
        >

        <v-btn
            size="small" color="#BBDEFB"
            :loading="localLoading"
            :disabled="localLoading"
            @click="login()"
        >
            <p>{{$store.getters.getLang == 'ja'? 'ログイン':'Log in'}}</p>
        </v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            localLoading:false,
            email:null,
            password:null,
            errorMessages: { email:[],password:[],other:null },
        }
    },
    methods: {
        async setToken(token){
            await chrome.storage.local.set({ sundlfAddonToken: token })
        },
        async login(){
            this.localLoading = true
            await axios.post('login',{
                email:this.email,
                password:this.password,
            })
            .then((res) => {
                console.log(res);
                this.setToken(res.data.token)
                this.$emit("logined")
            })
            .catch((res) => {
                console.log(res.response);
                try {
                    let messages = res.response.data.messages
                    this.errorMessages.email = messages.email
                    this.errorMessages.password = messages.password
                    this.errorMessages.other = messages.other
                }
                catch (error) {
                    this.errorMessages.other = res.response
                }
            })
            .finally(() => {this.localLoading = false})
        }
    },
}
</script>

<style lang="scss" scoped>
div{
    display: flex;
    flex-flow: column;
    gap: 1rem;
}
</style>