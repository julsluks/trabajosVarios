<script type="module">
import { useAppStore } from '@/stores/app.js'

export default {
    data() {
        return {
            user: {
                userName: "",
                password: ""
            },
            loginAcces: false
        }
    },
    methods: {
        validateLogin() {
            if (this.user.userName == "user" && this.user.password == "123") {
                this.loginAcces = true;
                const app = useAppStore();
                app.setLoginInfo(this.loginAcces, this.user.userName, this.user.password);
                this.$router.push('/votacions');
            } else {
                this.loginAcces = false;
                if (this.user.userName == "" || this.user.password == "") {
                    alert('Please enter your username and password!')
                } else {
                    alert('Incorrect username or password!')
                }  
                this.user.userName = "";
                this.user.password = "";
                const app = useAppStore();
                app.setLoginInfo(this.loginAcces, this.user.userName, this.user.password);
            }
        }
    }
}
</script>

<template>
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
            <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
            <span class="text-600 font-medium line-height-3">Don't have an account?</span>
            <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>
        </div>

        <div>
            <label for="user" class="block text-900 font-medium mb-2">UserName</label>
            <InputText id="user" type="text" placeholder="User Name" class="w-full mb-3" v-model="user.userName" />

            <label for="password" class="block text-900 font-medium mb-2">Password</label>
            <InputText id="password" type="password" placeholder="Password" class="w-full mb-3" v-model="user.password" />

            <Button label="Sign In" icon="pi pi-user" class="w-full" @click="validateLogin()"></Button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>