<template>
    <div>
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
            :placeholder="$store.state.lang == 'ja'? 'メールアドレス':'email address'"
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
            :placeholder="$store.state.lang == 'ja'? 'パスワード':'password'"
        >

        <v-btn
            size="small" color="#BBDEFB"
            :loading="localLoading"
            :disabled="localLoading"
            @click="submit()"
        >
            <p>{{$store.state.lang == 'ja'? 'ログイン':'Log in'}}</p>
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
            errorMessages: { email:[],password:[] },
        }
    },
    methods: {
        async submit(){
            console.log(this.email,this.password);
            await axios.post('api/extended/login',{
                email:this.email,
                password:this.password,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((res) => {
                console.log(res.response.data.messages);
                let messages = res.response.data.messages
                this.errorMessages.email = messages.email
                this.errorMessages.password = messages.password
            })
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